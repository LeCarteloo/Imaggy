import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';

dotenv.config();

const app = new App([], Number(process.env.PORT) || 3000);

// Healthcheck

app.listen();
