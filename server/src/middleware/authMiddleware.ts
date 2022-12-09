import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utilis/Token';
import { Token } from '@/interfaces/interfaces';
import UserModel from '@/models/User.model';
import HttpException from '@/utilis/HttpException';
import jwt from 'jsonwebtoken';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Not authorized'));
  }

  const token = bearer.split(' ')[1];

  try {
    const { JWT_SECRET } = process.env;
    const decodedToken: Token | jwt.JsonWebTokenError = await verifyToken(
      token,
      JWT_SECRET as string,
    );

    // If there is an error
    if (decodedToken instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Invalid token'));
    }

    const user = await UserModel.findById(decodedToken.id).select('_id');
    if (!user) {
      return next(new HttpException(401, 'Not authorized'));
    }

    // Adding user id to API payload
    req.user = user._id;

    next();
  } catch (error) {
    return next(new HttpException(401, 'Not authorized'));
  }
};

export default authMiddleware;
