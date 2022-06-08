import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rmSync } from 'fs';
import { join } from 'path';

describe('Post Controller test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    console.log(join(__dirname, '../../public'));
    rmSync(join(__dirname, '../public'), { force: true, recursive: true });
    app.close();
  });

  it('/posts (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .field('title', 'title')
      .field('contents', 'contents')
      .field('address', 'address')
      .attach('images', join(__dirname, 'images/test.jpg'));

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).toBeDefined();
  });
});
