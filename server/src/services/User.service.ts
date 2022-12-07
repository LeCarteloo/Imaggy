import UserModel from '@/models/User.model';
import { IUser } from '@/interfaces/interfaces';
import { Error } from 'mongoose';

class UserService {
  // @desc Register user
  // @route POST /register
  // @access Public
  public async register(body: IUser): Promise<IUser | Error> {
    try {
      const user = new UserModel(body);
      const userExist = await UserModel.findOne({
        $or: [{ username: user.username }, { email: user.email }],
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
