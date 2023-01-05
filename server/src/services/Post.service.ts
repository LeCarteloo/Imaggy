import { Post, User } from '@/interfaces/interfaces';
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
      const posts = await PostModel.find()
        .populate('author likes')
        .sort('-createdAt');

      return posts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to get posts');
    }
  }

  /*
   * Getting post by id
   */
  public async getPost(postId: string): Promise<Post | Error> {
    try {
      const post = await PostModel.findByIdAndUpdate(
        postId,
        {
          $inc: { views: 1 },
        },
        { new: true },
      ).populate('author likes');

      if (!post) {
        throw new Error('Post doesnt exist');
      }

      return post;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to get user posts');
    }
  }

  /*
   * Like the post by id
   */
  public async likePost(postId: string, userId: string): Promise<Post | Error> {
    try {
      const post = await PostModel.findOne({
        _id: postId,
        likes: userId,
      }).populate('author');

      if (post) {
        throw new Error('You already like this post');
      }

      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: { likes: userId },
        },
        { new: true },
      );

      if (!updatedPost) {
        throw new Error('Post doesnt exist');
      }

      return updatedPost;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to like post');
    }
  }

  /*
   * Unlike the post by id
   */
  public async unlikePost(
    postId: string,
    userId: string,
  ): Promise<Post | Error> {
    try {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, likes: userId },
        {
          $pull: { likes: userId },
        },
        { new: true },
      ).populate('author');

      if (!updatedPost) {
        throw new Error('You are not liking this post');
      }

      return updatedPost;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to unlike post');
    }
  }

  /*
   * Update the post by id and with provided data
   */
  public async updatePost(
    postId: string,
    userId: string,
    body: Post,
  ): Promise<Post | Error> {
    try {
      // TODO: add not authorized information (when a user
      // TODO: tries to update a post that is not theirs)
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, author: userId },
        { ...body },
        { new: true },
      ).populate('author', '_id username avatar');

      if (!updatedPost) {
        throw new Error('Post doesnt exist');
      }

      return updatedPost;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to update post');
    }
  }

  /*
   * Delete the post by id
   */
  public async deletePost(postId: string, userId: string) {
    try {
      // TODO: add not authorized information (when a user
      // TODO: tries to update a post that is not theirs)
      const deletedPost = await PostModel.findOneAndDelete({
        _id: postId,
        author: userId,
      });

      if (!deletedPost) {
        throw new Error('Post doesnt exist');
      }

      return deletedPost;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to delete post');
    }
  }
}

export default PostService;
