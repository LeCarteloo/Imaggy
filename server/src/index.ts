import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import UserController from '@/controllers/User.controller';
import PostController from './controllers/Post.controller';

dotenv.config();

const controllers = [new UserController(), new PostController()];

const app = new App(controllers, Number(process.env.PORT) || 3000);

app.listen();
