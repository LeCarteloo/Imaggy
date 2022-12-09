import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { Schema } from 'joi';

type Errors = {
  [key: string]: string;
};

const validationMiddleware = (schema: Schema): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const errors: Errors = {};

        error.details.forEach((error: Joi.ValidationErrorItem) => {
          errors[error.path.toString()] = error.message;
        });

        res.status(400).send({
          status: 400,
          message: 'Validation error',
          errors,
        });
        return;
      }
      res.status(400).send({ status: 400, message: 'Unexpected error' });
    }
  };
};

export default validationMiddleware;
