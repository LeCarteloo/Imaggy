import { Controller, Post } from '@/interfaces/interfaces';
import validationMiddleware from '@/middleware/validationMiddleware';
import PostService from '@/services/Post.service';
import HttpException from '@/utilis/HttpException';
import postValidation from '@/validation/Post.validation';
import { Request, Response, NextFunction, Router } from 'express';

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initRotues();
  }

  private initRotues() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(postValidation.create),
      this.createPost,
    );
  }

  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Post | void> => {
    try {
      const { author, title, image, tags, device, location, description } =
        req.body;

      const post = await this.PostService.createPost(
        author,
        title,
        image,
        tags,
        device,
        location,
        description,
      );

      res.status(200).json(post);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };
}

export default PostController;
