import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('user e2e test', () => {
  let app: INestApplication;

  const token = process.env.TOKEN;
  const fakeToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2QzNWZmOC01ZTIxLTQ2YTEtOTU3OS0wMGQ4OWI0NmUyMjMiLCJlbWFpbCI6ImR1bW15LnlvdW5nLnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjU1NTQ0NTMzfQ.EteunfiSBD-Vws9BTa4lpJ_kvrPy_bDfqsFeTo7CKlE';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('authorization', token)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toBeDefined();
  });

  it('/users (GET) Forbidden', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('authorization', fakeToken)
      .send();

    expect(response.statusCode).toEqual(400);
  });

  it('/users (GET) Unauthorization', async () => {
    const response = await request(app.getHttpServer()).get(`/users`).send();

    expect(response.statusCode).toEqual(401);
  });
});
