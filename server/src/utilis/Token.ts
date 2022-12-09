import jwt, { VerifyErrors } from 'jsonwebtoken';
import { User, Token } from '@/interfaces/interfaces';

const createToken = (user: User, secret: string, life: string): string => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: life });
};

const verifyToken = async (
  token: string,
  secret: jwt.Secret,
): Promise<VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload as Token);
    });
  });
};

export { createToken, verifyToken };
