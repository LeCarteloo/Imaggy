import App from '../app';
import supertest from 'supertest';
import UserController from '@/controllers/User.controller';
import mongoose from 'mongoose';

const app = new App([new UserController()], Number(process.env.PORT) || 5000);

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'placeholder1@email.com',
  username: 'placeholder1',
  avatar: '',
  name: 'Place',
  password: 'Password',
  surname: 'Holder',
  bio: 'Lorem ipsum dolor sit amet consectetur',
  isPro: false,
  profileBg: '',
  skills: ['Mobile Design'],
  interest: [],
  links: {
    facebook: '',
    instagram: '',
    website: '',
  },
  location: 'New York',
  followers: [],
  following: [],
};

describe('Users', () => {
  describe('Register user route', () => {
    // describe('If user is logged', () => {
    // });

    it('Should return a 201 status and user', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post('/api/users/register')
        .send(userPayload);
      expect(statusCode).toBe(201);
      //   expect(body).toEqual(userPayload);
    });
  });

  afterAll(() => {
    app.dropDb();
    app.closeDbConn();
  });
});
