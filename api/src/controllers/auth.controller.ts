import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

import UserService from '../services/users.service';
import CONSTANTS from '../constants/index';

// const google = require('googleapis').google;
// const jwt = require('jsonwebtoken');
// const OAuth2 = google.auth.OAuth2;
// import passport from 'passport';

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = CONSTANTS.oauth2Credentials.client_id;
// const GOOGLE_CLIENT_SECRET = CONSTANTS.oauth2Credentials.client_secret;
// console.log('==============>', GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:3333/auth/google/callback',
//     },
//     function (accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     },
//   ),
// );

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { ...findUser, password: null }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public googleAuthSuccess = async (req: Request, res: Response, next: NextFunction) => {
    const userData: any = req.body;
    try {
      const userObj = await this.userService.findUserByIdAndSub(userData.nid, userData.sid);
      const { cookie, findUser } = await this.authService.login(userObj, true);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { ...findUser, password: null }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userData: User = req.user;

    try {
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  //   public googleSignIn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  // // Create an OAuth2 client object from the credentials in our config file
  // const oauth2Client = new OAuth2(CONSTANTS.oauth2Credentials.client_id, CONSTANTS.oauth2Credentials.client_secret, CONSTANTS.oauth2Credentials.redirect_uris[0]);

  // // Obtain the google login link to which we'll send our users to give us access
  // const loginLink = oauth2Client.generateAuthUrl({
  //   access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
  //   scope: CONSTANTS.oauth2Credentials.scopes // Using the access scopes from our config file
  // });
  // return res.render("index", { loginLink: loginLink });

  //     // const { token } = req.body;
  //     // const ticket = await client.verifyIdToken({
  //     //   idToken: token,
  //     //   audience: process.env.CLIENT_ID,
  //     // });
  //     // const { name, email, picture } = ticket.getPayload();

  //     // const upsertedUser: User = await this.userService.upsertUserForOAuth({ name, email, picture });

  //     // const { cookie, findUser } = await this.authService.login(upsertedUser, true);
  //     // res.status(201);
  //   };

  //   public googleSignInCallback = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //     // Create an OAuth2 client object from the credentials in our config file
  //   const oauth2Client = new OAuth2(CONSTANTS.oauth2Credentials.client_id, CONSTANTS.oauth2Credentials.client_secret, CONSTANTS.oauth2Credentials.redirect_uris[0]);
  // const errorUrl = 'http://localhost:3000'
  //   if (req.query.error) {
  //     // The user did not give us permission.
  //     return res.redirect(errorUrl);
  //   } else {
  //     oauth2Client.getToken(req.query.code, function(err, token) {
  //       if (err)
  //         return res.redirect(errorUrl);

  //       // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
  //       res.cookie('jwt', jwt.sign(token, CONSTANTS.JWTsecret));
  //       return res.redirect('/get_some_data');
  //     });
  //   }
  //   };


  // public googleSignIn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   // app.get('/auth/google',
  //   console.log('============passport glogin');
    
  //   passport.authenticate('google', { scope: ['profile', 'email'] });
  // };

  // // app.get('/auth/google/callback',
  // public googleSignInCallback = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   passport.authenticate('google', { failureRedirect: '/error' }),
  //     function (req, res) {
  //       // Successful authentication, redirect success.
  //       res.redirect('/success');
  //     };
  // };
}

export default AuthController;
