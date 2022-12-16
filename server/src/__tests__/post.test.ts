import App from '../app';
import PostController from '@/controllers/Post.controller';
import UserController from '@/controllers/User.controller';
import supertest from 'supertest';
import { createToken } from '@/utilis/Token';
import mongoose from 'mongoose';

const path = '/api/posts';
const app = new App(
  [new PostController(), new UserController()],
  Number(process.env.PORT) || 5000,
);
const superTest = supertest(app.express);

const validPostPayload = {
  title: 'TestTitle',
  image: 'TestImage',
  location: 'TestLocation',
  tags: ['TestTag'],
  device: 'TestDevice',
  description: 'TestDescription',
};

const invalidPostPayload = {
  location: 'TestLocation',
  tags: ['TestTag'],
  device: 'TestDevice',
  description: 'TestDescription',
};

describe('Posts', () => {
  let token: string;

  beforeAll(async () => {
    const userPayload = {
      email: 'placeholder3@email.com',
      username: 'placeholder3',
      name: 'Place',
      password: 'password@123',
      surname: 'Holder',
      bio: 'Lorem ipsum dolor sit amet consectetur',
      skills: ['Mobile Design'],
      interest: [],
      location: 'New York',
    };
    const { body } = await superTest
      .post('/api/users/register')
      .send(userPayload);
    console.log(body);
    token = createToken(
      body,
      process.env.JWT_SECRET as string,
      process.env.JWT_LIFE as string,
    );
  });

  describe('Create route', () => {
    describe('Valid data', () => {
      it('Should specify JSON in the Content-Type header', async () => {
        const { headers } = await superTest
          .post(path)
          .send(validPostPayload)
          .set('Authorization', `Bearer ${token}`);

        expect(headers['content-type']).toEqual(
          expect.stringContaining('json'),
        );
      });

      it('Should return 200 code and correct post object', async () => {
        const { body, statusCode } = await superTest
          .post(path)
          .send(validPostPayload)
          .set('Authorization', `Bearer ${token}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          ...validPostPayload,
          views: 0,
          downloads: 0,
          likes: [],
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
          author: expect.any(String),
        });
      });
    });

    describe('Invalid data', () => {
      it('Should return 400 code and correct message', async () => {
        const { body, statusCode } = await superTest
          .post(path)
          .send(invalidPostPayload);

        expect(statusCode).toBe(400);
        expect(body).toEqual({
          status: 400,
          errors: expect.any(Object),
          message: expect.any(String),
        });
        expect(body.errors).toHaveProperty('image');
        expect(body.errors).toHaveProperty('title');
      });
    });

    afterAll(async () => {
      await mongoose.connection.collection('posts').drop();
    });
  });

  describe('Get route', () => {
    beforeAll(async () => {
      await superTest
        .post(`${path}`)
        .send(validPostPayload)
        .set('Authorization', `Bearer ${token}`);
    });

    it('Should specify JSON in the Content-Type header', async () => {
      const { headers } = await superTest.get(path);

      expect(headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    it('Should return 200 status and one post', async () => {
      const { body, statusCode } = await superTest.get(path);

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
    });

    afterAll(async () => {
      await mongoose.connection.collection('posts').drop();
    });
  });

  afterAll(async () => {
    mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
