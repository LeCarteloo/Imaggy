import jwt, { VerifyErrors } from 'jsonwebtoken';
import { IToken } from '@/interfaces/interfaces';
import { IUserModel } from '@/models/User.model';

const createToken = (
  user: IUserModel,
  secret: string,
  life: string,
): string => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: life });
};

const verifyToken = async (
  token: string,
  secret: jwt.Secret,
): Promise<VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload as IToken);
    });
  });
};

export { createToken, verifyToken };
