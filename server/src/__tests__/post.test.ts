import App from '../app';
import PostController from '@/controllers/Post.controller';
import supertest from 'supertest';

const path = '/api/posts';
const app = new App([new PostController()], Number(process.env.PORT) || 5000);

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
  describe('Create route', () => {
    describe('Valid data', () => {
      it('Should specify JSON in the Content-Type header', async () => {
        const { headers } = await superTest
          .post(`${path}`)
          .send(validPostPayload);

        expect(headers['content-type']).toEqual(
          expect.stringContaining('json'),
        );
      });

      it('Should return 200 code and correct post object', async () => {
        const { body, statusCode } = await superTest
          .post(`${path}`)
          .send(validPostPayload);

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
        });
      });
    });

    describe('Invalid data', () => {
      it('Should return 400 code and correct message', async () => {
        const { body, statusCode } = await superTest
          .post(`${path}`)
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
  });

  afterAll(() => {
    app.closeDbConn();
  });
});
