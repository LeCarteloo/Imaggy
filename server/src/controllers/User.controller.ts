import { Router, Request, Response, NextFunction } from 'express';
import { IController } from '@/interfaces/interfaces';
import HttpException from '@/utilis/HttpException';
import UserService from '@/services/User.service';
import valdiate from '@/validation/User.validation';
import validationMiddleware from '@/middleware/validationMiddleware';

class UserController implements IController {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(valdiate.register),
      this.register,
    );
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };
}

export default UserController;
