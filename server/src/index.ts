import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import UserController from '@/controllers/User.controller';

dotenv.config();

const controllers = [new UserController()];

const app = new App(controllers, Number(process.env.PORT) || 3000);

app.listen();
