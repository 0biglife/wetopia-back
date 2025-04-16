import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
// import { SeederService } from './seeder/seeder.service';
// import { STOCK_SYMBOLS } from './constants/symbols';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://0biglife.com'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // const seeder = app.get(SeederService);
  // await seeder.seedAllSymbols(STOCK_SYMBOLS);
  app.use(compression()); // gzip 응답 압축 적용

  await app.listen(4000);
}
bootstrap();
