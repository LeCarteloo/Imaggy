import App from '../app';
import supertest from 'supertest';

const app = new App([], Number(process.env.PORT) || 3000);

describe('Healthcheck', () => {
  it('Should return a 200 status and message', async () => {
    const { body, statusCode } = await supertest(app.express).get(
      '/api/healthcheck',
    );

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('message');
  });

  afterAll(() => {
    app.closeDbConn();
  });
});
