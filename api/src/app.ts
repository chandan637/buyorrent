import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from 'swagger-jsdoc';
import { connect, set, Types } from 'mongoose';
import { dbConnection } from './database';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';

const session = require('express-session');
const passport = require('passport');
import userModel from './models/users.model';
import UserService from './services/users.service';
import AuthService from './services/auth.service';

const userService = new UserService();
const authService = new AuthService();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import path from 'path';

passport.serializeUser(function (user, cb) {
  if (user._json && user._json.email) {
    return cb(null, user._json.email);
  }
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  const query = {};
  if (Types.ObjectId.isValid(id)) {
    query['_id'] = Types.ObjectId(id);
  } else {
    query['email'] = id;
  }
  userModel.findOne(query, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '145764080567-8mphvejukddmk50rmk3sm9lqeg52bvck.apps.googleusercontent.com',
      clientSecret: 'VgU1ldWWAGuVF7NYTCCJ92kE',
      callbackURL: 'http://localhost:3333/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    },
  ),
);

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8888;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app.set;
  }

  // public setViewPath() {
  //   this.app.set('views', path.join(__dirname, '../views'));
  //   this.app.set('view engine', 'pug');
  // }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        logger.info('🟢 The database is connected.');
      })
      .catch((error: Error) => {
        logger.error(`🔴 Unable to connect to the database: ${error}.`);
      });
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    // this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: 'NOTSOSECRET', // this
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', { failureRedirect: `${process.env.BASE_URL}/login` }),
      async function (req, res) {
        const userRawData: any = req['user'] && req['user']['_json'];
        let clientUrl = process.env.BASE_URL;

        // Successful authentication, redirect home.
        if (userRawData.email) {
          const newUser = await userService.upsertUserForOAuth({ ...userRawData });
          clientUrl += `google-success/${userRawData.sub}/${newUser._id}`;
        }
        res.redirect(302, clientUrl);
      },
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
    this.initStatic();
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    // const specs = swaggerJSDoc(options);
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initStatic() {
    this.app.use(express.static(path.join(__dirname, '../../ui/build')));
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../ui/build', 'index.html'));
    });
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../ui/build', 'index.html'));
    });
  }
}

export default App;
