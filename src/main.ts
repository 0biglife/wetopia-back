import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SeederService } from './seeder/seeder.service';
// import { STOCK_SYMBOLS } from './constants/symbols';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // const seeder = app.get(SeederService);
  // await seeder.seedAllSymbols(STOCK_SYMBOLS);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
