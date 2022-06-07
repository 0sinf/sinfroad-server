import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User Controller test', () => {
  let app: INestApplication;
  let user: { email: string; password: string };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    user = {
      email: 'email@eee.com',
      password: 'password',
    };
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        ...user,
        passwordConfirm: 'password',
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toBeDefined();
  });

  it('/users/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user);

    expect(response.statusCode).toEqual(201);
    expect(response.body.token).toBeDefined();
  });
});
