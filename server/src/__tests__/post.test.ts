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

const userId = new mongoose.Types.ObjectId();
const postId = new mongoose.Types.ObjectId();

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
      _id: userId,
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

  describe('Get all route', () => {
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

  describe('Get by id route', () => {
    it('Should specify JSON in the Content-Type header', async () => {
      const { headers } = await superTest.get(`${path}/${userId}`);

      expect(headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    it('Should return 404 status and correct message', async () => {
      const { body, statusCode } = await superTest.get(`${path}/${postId}`);

      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('message');
    });

    it('Should return 200 status and correct post', async () => {
      const response = await superTest
        .post(`${path}`)
        .send(validPostPayload)
        .set('Authorization', `Bearer ${token}`);

      const { body, statusCode } = await superTest.get(
        `${path}/${response.body._id}`,
      );

      expect(statusCode).toBe(200);
      expect(body._id).toBe(response.body._id);
    });

    afterAll(async () => {
      await mongoose.connection.collection('posts').drop();
    });
  });

  describe('Like post route', () => {
    let postId: string;

    beforeAll(async () => {
      const { body } = await superTest
        .post(path)
        .send(validPostPayload)
        .set('Authorization', `Bearer ${token}`);

      postId = body._id;
    });

    it('Should specify JSON in the Content-Type header', async () => {
      const { headers } = await superTest.patch(`${path}/${postId}/like`);

      expect(headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    it('Should return 200 status and user should be in likes array', async () => {
      const { body, statusCode } = await superTest
        .patch(`${path}/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.likes).toContain(userId.toString());
    });

    it('Should return 400 status and have message property', async () => {
      const { body, statusCode } = await superTest
        .patch(`${path}/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
    });

    afterAll(async () => {
      await mongoose.connection.collection('posts').drop();
    });
  });

  describe('Unlike post route', () => {
    let postId: string;

    beforeAll(async () => {
      // Creating the post
      const { body } = await superTest
        .post(path)
        .send(validPostPayload)
        .set('Authorization', `Bearer ${token}`);
      postId = body._id;

      // Liking the post
      await superTest
        .patch(`${path}/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);
    });

    it('Should specify JSON in the Content-Type header', async () => {
      const { headers } = await superTest.patch(`${path}/${postId}/unlike`);

      expect(headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    it('Should return 200 status and correct post', async () => {
      const { body, statusCode } = await superTest
        .patch(`${path}/${postId}/unlike`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body._id).toBe(postId);
    });

    it('Should return 400 status and have property message', async () => {
      const { body, statusCode } = await superTest
        .patch(`${path}/${postId}/unlike`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
    });

    afterAll(async () => {
      await mongoose.connection.collection('posts').drop();
    });
  });

  afterAll(async () => {
    await app.dropDb();
    await app.closeDbConn();
  });
});
