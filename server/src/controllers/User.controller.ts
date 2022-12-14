import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '@/interfaces/interfaces';
import HttpException from '@/utilis/HttpException';
import UserService from '@/services/User.service';
import valdiate from '@/validation/User.validation';
import validationMiddleware from '@/middleware/validationMiddleware';
import authMiddleware from '@/middleware/authMiddleware';

class UserController implements Controller {
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
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(valdiate.login),
      this.login,
    );
    this.router.put(
      this.path,
      authMiddleware,
      validationMiddleware(valdiate.update),
      this.updateUser,
    );
    this.router.get(`${this.path}/:username`, this.getUser);
    this.router.patch(
      `${this.path}/:id/follow`,
      authMiddleware,
      this.followUser,
    );
    this.router.patch(
      `${this.path}/:id/unfollow`,
      authMiddleware,
      this.unfollowUser,
    );
  }

  //* @desc Register user
  //* @route POST /register
  //* @access Public
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

  //* @desc Login user
  //* @route POST /login
  //* @access Public
  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user = await this.UserService.login(email, password);

      if (user instanceof Error) {
        return next(new HttpException(400, 'Unable to login'));
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  //* @desc Get user
  //* @route GET /:username
  //* @access Public
  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req.params;
      const user = await this.UserService.getUser(username);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(404, error.message));
      }
    }
  };

  //* @desc Update user
  //* @route PUT /
  //* @access Private
  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const user = await this.UserService.updateUser(userId, req.body);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  //* @desc Follow user
  //* @route PATCH /:id/follow
  //* @access Private
  private followUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = req.user._id;
      const followingId = req.params.id;

      if (userId.toString() === followingId) {
        return next(new HttpException(400, 'You cannot follow yourself'));
      }

      const user = await this.UserService.followUser(userId, followingId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  //* @desc Unfollow user
  //* @route PATCH /:id/unfollow
  //* @access Private
  private unfollowUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = req.user._id;
      const unfollowingId = req.params.id;

      if (userId.toString() === unfollowingId) {
        return next(new HttpException(400, 'You cannot unfollow yourself'));
      }

      const user = await this.UserService.unfollowUser(userId, unfollowingId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };
}

export default UserController;
