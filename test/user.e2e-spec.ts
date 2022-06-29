import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('user e2e test', () => {
  let app: INestApplication;

  const token = process.env.TOKEN;
  const user = {
    id: 'd3d35ff8-5e21-46a1-9579-00d89b46e222',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toBeDefined();
  });

  it('/users/:id (GET) Other user info', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/otheruserId`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toEqual(401);
  });

  it('/users/:id (GET) Unauthorization', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .send();

    expect(response.statusCode).toEqual(401);
  });
});
