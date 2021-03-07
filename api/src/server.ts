import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import PropertyRoute from './routes/property.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new AuthRoute(), new PropertyRoute()]);
try {
  app.listen();
} catch (err) {
  console.log('Error:', err.message);
}
