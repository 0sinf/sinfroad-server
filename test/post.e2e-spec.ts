import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rmSync } from 'fs';
import { join } from 'path';
import { PostService } from '../src/post/post.service';

describe('Post Controller test', () => {
  let app: INestApplication;
  let token = 'Bearer ';
  let postId: string;

  const post = {
    id: 'b62b6b94-bc13-451a-ac1d-27948df6a292',
    title: 'title',
    contents: 'contents',
    address: 'address',
    images: 'image.domain/url',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };

  const postService = {
    findPost: () => post,
    createPost: () => post,
    updatePost: () => ({}),
    deletePost: () => ({}),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

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

  it('/posts/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/posts/${post.id}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.title).toBeDefined();
    expect(response.body.contents).toBeDefined();
    expect(response.body.address).toBeDefined();
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

    postId = response.body.id;
  });

  it('/posts (POST) Unauthorization', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .field('title', 'title')
      .field('contents', 'contents')
      .field('address', 'address')
      .attach('images', join(__dirname, 'images/test.jpg'));

    expect(response.statusCode).toEqual(401);
  });

  it('/posts (POST) Validation', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .set('authorization', token)
      .field('title', '')
      .field('contents', 'contents')
      .field('address', 'address')
      .attach('images', join(__dirname, 'images/test.jpg'));

    expect(response.statusCode).toEqual(400);
  });

  it('/posts/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/posts/${postId}`)
      .set('authorization', token)
      .send({
        title: 'updated title',
        contents: 'updated contents',
        address: 'updated address',
      });

    expect(response.statusCode).toEqual(200);
  });

  it('/posts/:id (PATCH) Unauthorization', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/posts/${postId}`)
      .send({
        title: 'updated title',
        contents: 'updated contents',
        address: 'updated address',
      });

    expect(response.statusCode).toEqual(401);
  });

  it('/posts/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/posts/${postId}`)
      .set('authorization', token)
      .send({
        title: '',
        contents: 'updated contents',
        address: 'updated address',
      });

    expect(response.statusCode).toEqual(400);
  });

  it('/posts/:id (PATCH) not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch('/posts/sdfadfaljkasd')
      .set('authorization', token)
      .send({
        title: 'updated title',
        contents: 'updated contents',
        address: 'updated address',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('존재하지 않는 글입니다.');
  });

  it('/post/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('/post/:id (DELETE) Unauthorization', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set('authorization', 'asdlkjasdlk')
      .send();

    expect(response.statusCode).toEqual(401);
  });

  it('/post/:id (DELETE) not exist', async () => {
    const response = await request(app.getHttpServer())
      .delete('/posts/aslkdjlaksdj')
      .set('authorization', token)
      .send();

    expect(response.statusCode).toEqual(400);
  });
});
