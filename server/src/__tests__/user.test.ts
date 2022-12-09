import App from '../app';
import supertest from 'supertest';
import UserController from '@/controllers/User.controller';
import mongoose from 'mongoose';

const app = new App([new UserController()], Number(process.env.PORT) || 5000);
const userId = new mongoose.Types.ObjectId().toString();

const correctPassword = 'password@123';
const incorrectPassword = 'password';

const userPayload = {
  _id: userId,
  email: 'placeholder1@email.com',
  username: 'placeholder1',
  name: 'Place',
  password: correctPassword,
  surname: 'Holder',
  bio: 'Lorem ipsum dolor sit amet consectetur',
  skills: ['Mobile Design'],
  interest: [],
  location: 'New York',
};

describe('Users', () => {
  beforeAll(() => {
    app.dropDb();
  });

  describe('Register user route', () => {
    beforeEach(() => {
      app.dropDb();
    });

    it('Should return a 400 status and validation error', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post('/api/users/register')
        .send({ ...userPayload, password: incorrectPassword });

      expect(statusCode).toBe(400);
      expect(body.message).toBe('Validation error');
    });

    it('Should return a 201 status and user object', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post('/api/users/register')
        .send(userPayload);

      expect(statusCode).toBe(201);
      expect(body).toEqual({
        ...userPayload,
        __v: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        password: expect.any(String),
        links: expect.objectContaining({
          facebook: '',
          instagram: '',
          website: '',
        }),
        profileBg: expect.any(String),
        avatar: expect.any(String),
        followers: [],
        following: [],
        isPro: false,
      });
    });
  });

  describe('Login user route', () => {
    // Registering user before login tests
    beforeAll(async () => {
      await supertest(app.express)
        .post('/api/users/register')
        .send(userPayload);
    });
    it('Should return 400 and user doesnt exist', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post('/api/users/login')
        .send({ email: 'wrong@email.com', password: 'wrongpassword' });

      expect(statusCode).toBe(400);
      expect(body.message).toBe("User doesn't exist");
    });

    it('Should return 200 status and correct id', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post('/api/users/login')
        .send({ email: userPayload.email, password: userPayload.password });
      console.log(body);

      expect(statusCode).toBe(200);
      expect(body._id).toBe(userPayload._id);
    });
  });

  afterAll(() => {
    app.closeDbConn();
  });
});
