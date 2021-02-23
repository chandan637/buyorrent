import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import UsersRoute from './routes/users.route';
import PropertyRoute from './routes/property.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new PropertyRoute()]);
try {
  app.listen();
} catch (err) {
  return logger.error('Error:', err.message);
}
