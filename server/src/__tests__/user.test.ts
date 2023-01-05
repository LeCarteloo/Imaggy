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
  _id: userId2,
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
  describe('Register route', () => {
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

    afterAll(async () => {
      await app.dropDb();
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

    afterAll(async () => {
      await app.dropDb();
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

    afterAll(async () => {
      await app.dropDb();
    });
  });

  describe('Update user route', () => {
    let user: User;

    // Registering users before follow tests
    beforeAll(async () => {
      const { body } = await supertest(app.express)
        .post(`${path}/register`)
        .send(userPayload);
      user = body;
      await supertest(app.express).post(`${path}/register`).send(userPayload2);
    });

    it('Should return 400 status and validation error', async () => {
      const postPayload = {
        email: '',
        username: '',
        avatar: '',
        name: '',
        surname: '',
        bio: '',
        profileBg: '',
        skills: [],
        interest: [],
        links: {
          facebook: '',
          instagram: '',
          website: '',
        },
        location: '',
      };

      const token = createToken(
        user,
        process.env.JWT_SECRET as string,
        process.env.JWT_LIFE as string,
      );
      const { body, statusCode } = await supertest(app.express)
        .put(path)
        .send(postPayload)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message', 'Validation error');

      // Checking if validation error is provided for required values
      ['email', 'name', 'surname', 'username'].forEach((property) => {
        expect(body.errors).toHaveProperty(property);
      });
    });

    it('Should return 200 status, update user and return correct data', async () => {
      const postPayload = {
        email: 'testdata@testdata.com',
        username: 'testdata',
        avatar: 'testdata',
        name: 'testdata',
        surname: 'testdata',
        bio: 'testdata',
        profileBg: 'testdata',
        skills: ['testdata'],
        interest: ['testdata'],
        links: {
          facebook: 'testdata',
          instagram: 'testdata',
          website: 'testdata',
        },
        location: 'testdata',
      };

      const token = createToken(
        user,
        process.env.JWT_SECRET as string,
        process.env.JWT_LIFE as string,
      );
      const { body, statusCode } = await supertest(app.express)
        .put(path)
        .send(postPayload)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body).toEqual({
        __v: expect.any(Number),
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        password: expect.any(String),
        followers: [],
        following: [],
        isPro: false,
        ...postPayload,
      });
    });

    afterAll(async () => {
      await app.dropDb();
    });
  });

  describe('Follow route', () => {
    let user: User;
    // Registering users before follow tests
    beforeAll(async () => {
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

    afterAll(async () => {
      await app.dropDb();
    });
  });

  describe('Unfollow route', () => {
    let user: User;

    // Registering users before unfollow tests
    beforeAll(async () => {
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

    afterAll(async () => {
      await app.dropDb();
    });
  });

  afterAll(async () => {
    await app.closeDbConn();
  });
});
