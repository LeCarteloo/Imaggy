import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { Schema, ValidationErrorItem } from 'joi';

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
      const errors: string[] = [];
      if (error instanceof Joi.ValidationError) {
        error.details.forEach((error: ValidationErrorItem) => {
          errors.push(error.message);
        });
        res.status(400).send({ errors });
      } else {
        res.status(400).send({ message: 'Unexpected error' });
      }
    }
  };
};

export default validationMiddleware;
