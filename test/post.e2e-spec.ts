import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rmSync } from 'fs';
import { join } from 'path';

describe('Post Controller test', () => {
  let app: INestApplication;
  let token = 'Bearer ';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    token += process.env.TOKEN;
  });

  afterAll(async () => {
    rmSync(join(__dirname, '../static/public'), {
      force: true,
      recursive: true,
    });
    app.close();
  });

  it('/posts (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .set('authorization', token)
      .field('title', 'title')
      .field('contents', 'contents')
      .field('address', 'address')
      .attach('images', join(__dirname, 'images/test.jpg'));

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toBeDefined();
  });

  it('/posts (POST) Unauthorization', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .field('title', 'title')
      .field('contents', 'contents')
      .field('address', 'address')
      .attach('images', join(__dirname, 'images/test.jpg'));

    expect(response.statusCode).toEqual(403);
  });
});
