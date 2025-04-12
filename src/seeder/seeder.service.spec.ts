import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeederService],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('최초 1회 주가 업데이트 테스트', () => {
    expect(service).toBeDefined();
  });
});
