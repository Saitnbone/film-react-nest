import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLogger } from './utils/logger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.useLogger(getLogger());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3000);
}

bootstrap();
