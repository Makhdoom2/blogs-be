// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api');
//   app.enableCors({
//     origin: 'http://localhost:3000', // frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     // credentials: true,
//   });
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

///for vercel dep below

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

const server = express();

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ extended: true, limit: '5mb' }));

async function createNestApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.init();
  return server;
}

export const handler = serverless(server);

// for local dev
if (process.env.NODE_ENV !== 'production') {
  createNestApp().then(() => {
    server.listen(3000, () =>
      console.log('NestJS running locally on http://localhost:3000'),
    );
  });
}
