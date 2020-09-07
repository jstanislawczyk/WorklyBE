import {Application} from './config/application';

async function bootstrap() {
  const application: Application = new Application();

  await application.start();
}

bootstrap();
