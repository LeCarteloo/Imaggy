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

      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Unable to create user');
    }
  }
}

export default UserService;
