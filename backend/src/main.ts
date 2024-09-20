import { NestFactory } from '@nestjs/core';
import { MainHttpModule } from './persons/main-http.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MainHttpModule);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  })
  await app.listen(8080);
}
bootstrap();
