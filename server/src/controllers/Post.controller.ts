import { Controller, Post } from '@/interfaces/interfaces';
import authMiddleware from '@/middleware/authMiddleware';
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
      this.path,
      validationMiddleware(postValidation.create),
      authMiddleware,
      this.createPost,
    );
    this.router.get(this.path, this.getPosts);
    this.router.get(`${this.path}/:id`, this.getPost);
  }

  //* @desc Create post
  //* @route POST /
  //* @access Private
  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Post | void> => {
    try {
      const authorId = req.user._id;
      const { title, image, tags, device, location, description } = req.body;

      const post = await this.PostService.createPost(
        authorId,
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

  //* @desc Get posts
  //* @route GET /
  //* @access Public
  private getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Post[] | void> => {
    try {
      const posts = await this.PostService.getPosts();

      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  //* @desc Get post by id
  //* @route GET /:id
  //* @access Public
  private getPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Post | void> => {
    try {
      const postId = req.params.id;
      const posts = await this.PostService.getPost(postId);

      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };
}

export default PostController;
