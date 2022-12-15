import App from '../app';
import supertest from 'supertest';
import UserController from '@/controllers/User.controller';
import mongoose from 'mongoose';
import { createToken } from '../utilis/Token';
import { User } from '@/interfaces/interfaces';

const path = '/api/users';
const app = new App([new UserController()], Number(process.env.PORT) || 5000);

const userId = new mongoose.Types.ObjectId().toString();
const userId2 = new mongoose.Types.ObjectId().toString();
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

const userPayload2 = {
  _id: userId,
  email: 'placeholder2@email.com',
  username: 'placeholder2',
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

  describe('Register route', () => {
    beforeEach(() => {
      app.dropDb();
    });

    it('Should return a 400 status and validation error', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post(`${path}/register`)
        .send({ ...userPayload, password: incorrectPassword });

      expect(statusCode).toBe(400);
      expect(body.message).toBe('Validation error');
    });

    it('Should return a 201 status and user object', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post(`${path}/register`)
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

  describe('Login route', () => {
    // Registering user before login tests
    beforeAll(async () => {
      await supertest(app.express).post(`${path}/register`).send(userPayload);
    });

    it('Should return 400 and user shouldnt exist', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post(`${path}/login`)
        .send({ email: 'wrong@email.com', password: 'wrongpassword' });

      expect(statusCode).toBe(400);
      expect(body.message).toBe("User doesn't exist");
    });

    it('Should return 200 status and correct user', async () => {
      const { body, statusCode } = await supertest(app.express)
        .post(`${path}/login`)
        .send({ email: userPayload.email, password: userPayload.password });
      expect(statusCode).toBe(200);
      expect(body._id).toBe(userPayload._id);
    });
  });

  describe('Get route', () => {
    // Registering user before get user tests
    beforeAll(async () => {
      await supertest(app.express).post(`${path}/register`).send(userPayload);
    });

    it('Should return 200 status and correct user', async () => {
      const { body, statusCode } = await supertest(app.express).get(
        `${path}/${userPayload.username}`,
      );

      expect(statusCode).toBe(200);
      expect(body._id).toBe(userPayload._id);
    });

    it('Should return 404 status and correct message', async () => {
      const { body, statusCode } = await supertest(app.express).get(
        `${path}/wrongusername`,
      );

      expect(statusCode).toBe(404);
      expect(body.message).toBe("User doesn't exist");
    });
  });

  describe('Follow route', () => {
    let user: User;

    // Registering users before login tests
    beforeAll(async () => {
      app.dropDb();
      const { body } = await supertest(app.express)
        .post(`${path}/register`)
        .send(userPayload);
      user = body;
      await supertest(app.express).post(`${path}/register`).send(userPayload2);
    });

    it('Should return 200 status and have user in following array', async () => {
      const token = createToken(
        user,
        process.env.JWT_SECRET as string,
        process.env.JWT_LIFE as string,
      );

      const { body, statusCode } = await supertest(app.express)
        .patch(`${path}/${userId2}/follow`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.following).toContain(userId2);
    });
  });

  describe('Unfollow route', () => {
    let user: User;

    // Registering users before login tests
    beforeAll(async () => {
      app.dropDb();
      const { body } = await supertest(app.express)
        .post(`${path}/register`)
        .send(userPayload);
      user = body;
      await supertest(app.express).post(`${path}/register`).send(userPayload2);
    });

    it('Should return 200 status and not have user in following array', async () => {
      const token = createToken(
        user,
        process.env.JWT_SECRET as string,
        process.env.JWT_LIFE as string,
      );

      // Following user
      await supertest(app.express)
        .patch(`${path}/${userId2}/follow`)
        .set('Authorization', `Bearer ${token}`);

      // Unfollowing user
      const { body, statusCode } = await supertest(app.express)
        .patch(`${path}/${userId2}/unfollow`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.following).not.toContain(userId2);
    });

    it('Should return 400 status and correct message', async () => {
      const token = createToken(
        user,
        process.env.JWT_SECRET as string,
        process.env.JWT_LIFE as string,
      );

      // Unfollowing user that have not been followed
      const { body, statusCode } = await supertest(app.express)
        .patch(`${path}/${userId2}/unfollow`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(400);
      expect(body.message).toBe('You are not following this user');
    });
  });

  afterAll(() => {
    app.closeDbConn();
  });
});
