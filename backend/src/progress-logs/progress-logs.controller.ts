import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ProgressLogsService } from './progress-logs.service'
import { CreateProgressLogDto } from './dto/create-progress-log.dto'

@Controller('api/internal/goals/:goalSlug/progress_logs')
export class ProgressLogsController {
  constructor(private readonly progressLogsService: ProgressLogsService) {}

  @Get()
  async findAll(@Param('goalSlug') goalSlug: string) {
    return this.progressLogsService.findAll(goalSlug)
  }

  @Get('bar_graph')
  async getBarGraph(@Param('goalSlug') goalSlug: string) {
    // 一旦仮データ
    const logs = [
      { date: '2025-08-25', studyTime: 120 },
      { date: '2025-08-26', studyTime: 90 },
      { date: '2025-08-27', studyTime: 150 },
      { date: '2025-08-28', studyTime: 60 },
      { date: '2025-08-29', studyTime: 180 },
      { date: '2025-08-30', studyTime: 200 },
      { date: '2025-08-31', studyTime: 100 },
    ]

    return { goalSlug, logs }
  }

  @Post()
  create(
    @Param('goalSlug') goalSlug: string,
    @Body() createProgressLogDto: CreateProgressLogDto,
  ) {
    return this.progressLogsService.create(goalSlug, createProgressLogDto)
  }
}
