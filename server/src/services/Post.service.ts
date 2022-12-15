import { Post } from '@/interfaces/interfaces';
import PostModel from '@/models/Post.model';

class PostService {
  public async createPost(
    author: string,
    title: string,
    image: string,
    tags: string[],
    device?: string,
    location?: string,
    description?: string,
  ): Promise<Post | Error> {
    try {
      const post = new PostModel({
        author,
        title,
        image,
        tags,
        device,
        location,
        description,
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
}

export default PostService;
