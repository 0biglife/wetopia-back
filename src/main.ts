import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SeederService } from './seeder/seeder.service';
// import { STOCK_SYMBOLS } from './constants/symbols';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000', 'https://0biglife.com'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // const seeder = app.get(SeederService);
  // await seeder.seedAllSymbols(STOCK_SYMBOLS);

  await app.listen(4000);
}
bootstrap();
