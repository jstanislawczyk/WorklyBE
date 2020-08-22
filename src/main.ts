import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication} from '@nestjs/common';

const port: number = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap().then(() => {});
