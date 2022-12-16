import { Post } from '@/interfaces/interfaces';
import PostModel from '@/models/Post.model';

class PostService {
  /*
   * Creates post with provided data
   */
  public async createPost(
    authorId: string,
    title: string,
    image: string,
    tags: string[],
    device?: string,
    location?: string,
    description?: string,
  ): Promise<Post | Error> {
    try {
      const post = new PostModel({
        title,
        image,
        tags,
        device,
        location,
        description,
        author: authorId,
      });

      const createdPost = await post.save();

      return createdPost;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to create post');
    }
  }

  /*
   * Getting all posts
   */
  public async getPosts(): Promise<Post[] | Error> {
    try {
      const posts = await PostModel.find().populate('author likes');

      return posts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unablte to get posts');
    }
  }
}

export default PostService;
