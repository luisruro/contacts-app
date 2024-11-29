import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true}))
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.setGlobalPrefix('api');
  await app.listen(configService.get('PORT'));
}
bootstrap();
