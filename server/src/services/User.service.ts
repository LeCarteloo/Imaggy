import UserModel from '@/models/User.model';
import { IUser } from '@/interfaces/interfaces';

class UserService {
  // @desc Register user
  // @route POST /register
  // @access Public
  public async register(body: IUser): Promise<IUser> {
    try {
      const user = await UserModel.create(body);
      return user;
    } catch (error) {
      throw new Error('Unable to register a user');
    }
  }
}

export default UserService;
