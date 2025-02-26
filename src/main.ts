import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(helmet());

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-type, Authorization',
  })
  app.use(compression);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
