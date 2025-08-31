import { Test, TestingModule } from '@nestjs/testing';
import { ProgressLogsService } from './progress-logs.service';

describe('ProgressLogsService', () => {
  let service: ProgressLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressLogsService],
    }).compile();

    service = module.get<ProgressLogsService>(ProgressLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
