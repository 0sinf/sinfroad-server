import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';

describe('User Controller test', () => {
  let app: INestApplication;
  let user: { email: string; password: string };

  const userService = {
    createUser: () => ({
      id: 'sdlfkjklsdfl',
      email: 'email@eee.com',
      password: 'password',
      grade: 1,
    }),
    loginUser: () => 'token',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

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

  it('/users (POST) BadRequest', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: '',
      passowrd: 'password',
      passwordConfirm: 'password',
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBeDefined();
  });

  it('/users/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user);

    expect(response.statusCode).toEqual(201);
    expect(response.body.token).toBeDefined();
  });

  it('/users/login (POST) BadRequest', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: '',
        password: 'password',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBeDefined();
  });
});
