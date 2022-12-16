import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { Controller } from '@/interfaces/interfaces';
import errorHandler from '@/middleware/errorHandler';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
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

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(errorHandler);
  }

  private async initDbConn(): Promise<void> {
    const { MONGO_URI, MONGO_DB, MONGO_USER, MONGO_PASS } = process.env;

    try {
      await mongoose.connect(
        `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}`,
      );
    } catch (error) {
      console.log('Could not connect with database');
      process.exit(1);
    }
  }

  public async closeDbConn(): Promise<void> {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.log('Could not close database connection');
      process.exit(1);
    }
  }

  public async dropDb(): Promise<void> {
    try {
      await mongoose.connection.dropDatabase();
    } catch (error) {
      console.log('Could not drop database');
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
