import UserModel from '@/models/User.model';
import { User } from '@/interfaces/interfaces';
import bcrypt from 'bcryptjs';
import { createToken } from '@/utilis/Token';

class UserService {
  // @desc Register user
  // @route POST /register
  // @access Public
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

  // @desc Login user
  // @route POST /login
  // @access Public
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

  // @desc Get user
  // @route GET /:username
  // @access Public
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

  // @desc Follow user
  // @route PATCH /:id/follow
  // @access Private
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
        throw new Error('You already follow this user');
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

      throw new Error('Unable to login');
    }
  }
}

export default UserService;
