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
  // @route POST /login
  // @access Public
}

export default UserService;
