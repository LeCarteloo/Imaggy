import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { IController } from '@/interfaces/interfaces';
import errorHandler from './middleware/ErrorHandler';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.express = express();
    this.port = port;
    this.initDbConn();
    this.initMiddleware();
    this.initHealthCheck();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initHealthCheck(): void {
    this.express.use(
      '/api/healthcheck',
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "I'm alive" });
      },
    );
  }

  private initMiddleware(): void {
    // TODO: Read about helmet
    // this.express.use()

    // Enabling CORS
    this.express.use(cors());
    // Adding logging tool
    this.express.use(morgan('dev'));
    // Parsing
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    // Compressing request
    this.express.use(compression());
  }

  private initControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(errorHandler);
  }

  private initDbConn(): void {
    const { MONGO_URI, MONGO_USER, MONGO_PASS } = process.env;

    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}`);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
