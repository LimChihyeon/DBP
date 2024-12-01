import { NestFactory } from '@nestjs/core';
import { AppModule } from './moduels/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
