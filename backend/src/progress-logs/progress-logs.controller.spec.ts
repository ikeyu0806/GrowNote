import { Test, TestingModule } from '@nestjs/testing';
import { ProgressLogsController } from './progress-logs.controller';
import { ProgressLogsService } from './progress-logs.service';

describe('ProgressLogsController', () => {
  let controller: ProgressLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressLogsController],
      providers: [ProgressLogsService],
    }).compile();

    controller = module.get<ProgressLogsController>(ProgressLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
