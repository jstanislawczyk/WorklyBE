import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from '../app.module';
import configuration from './configuration';

export class Application {

  public app: INestApplication;

  public async start(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    await app.listen(configuration().app.port);

    this.app = app;
  }

  public async stop(): Promise<void> {
    await this.app.close();
  }

  public async getUrl(): Promise<string> {
    return this.app.getUrl();
  }
}
