import UserModel from '@/models/User.model';
import { User } from '@/interfaces/interfaces';
import bcrypt from 'bcryptjs';
import { createToken } from '@/utilis/Token';

class UserService {
  /*
   * Register user with provided data
   */
  public async register(body: User): Promise<User | Error> {
    try {
      // Checking if user exist with given username and email
      const userExist = await UserModel.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (userExist) {
        throw new Error('User already exist');
      }

      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const user = new UserModel({
        ...body,
        password: hashedPassword,
      });

      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to create user');
    }
  }

  /*
   * Login user with given email and password
   */
  public async login(email: string, password: string): Promise<User | Error> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        throw new Error('Invalid credentials');
      }

      const { JWT_SECRET, JWT_LIFE } = process.env;
      const token = createToken(user, JWT_SECRET as string, JWT_LIFE as string);

      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { token: token },
        { new: true },
      );

      if (!updatedUser) {
        throw new Error("User doesn't exist");
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to login');
    }
  }

  /*
   * Getting user by username
   */
  public async getUser(username: string): Promise<User | Error> {
    try {
      const user = await UserModel.findOne({ username }).populate(
        'followers following',
        '-password',
      );

      if (!user) {
        throw new Error("User doesn't exist");
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to find user');
    }
  }

  /*
   * Update the user by id and with provided data
   */
  public async updateUser(userId: string, body: User): Promise<User | Error> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          ...body,
        },
        { new: true },
      ).populate('followers following', '-password');

      if (!updatedUser) {
        throw new Error('User doesnt exist');
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to update user');
    }
  }

  /*
   * Following user by logged user id and following user id
   */
  public async followUser(
    userId: string,
    followingId: string,
  ): Promise<User | Error> {
    try {
      const user = await UserModel.findOne({
        _id: userId,
        following: followingId,
      });

      if (user) {
        throw new Error('You are already following this user');
      }

      // Updating logged user's following array
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { following: followingId },
        },
        { new: true },
      );

      if (!updatedUser) {
        throw new Error('User doesnt exist');
      }

      // Updating followed user's followers array
      await UserModel.findByIdAndUpdate(
        followingId,
        { $push: { followers: userId } },
        { new: true },
      );

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to follow');
    }
  }

  /*
   * Unfollowing user by logged user id and unfollowing user id
   */
  public async unfollowUser(userId: string, unfollowingId: string) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId, following: unfollowingId },
        {
          $pull: { following: unfollowingId },
        },
        { new: true },
      ).populate('followers following', '-password');

      if (!updatedUser) {
        throw new Error('You are not following this user');
      }

      await UserModel.updateOne(
        { _id: unfollowingId },
        { $pull: { followers: userId } },
      );

      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unable to unfollow');
    }
  }
}

export default UserService;
