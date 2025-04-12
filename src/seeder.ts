import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import { STOCK_SYMBOLS } from './constants/symbols';

// Nest 서버를 띄우는게 아니라 의존성만 가져와서 호출 -> CLI 독립적 실행
// 따라서 main.ts와 분리하여 별도 파일로 관리
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seedAllSymbols(STOCK_SYMBOLS);
  await app.close();
}
bootstrap();
