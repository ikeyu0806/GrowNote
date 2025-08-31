import { Controller, Post, Body, Param } from '@nestjs/common'
import { ProgressLogsService } from './progress-logs.service'
import { CreateProgressLogDto } from './dto/create-progress-log.dto'

@Controller('api/internal/goals/:goalSlug/progress_logs')
export class ProgressLogsController {
  constructor(private readonly progressLogsService: ProgressLogsService) {}

  @Post()
  create(
    @Param('goalSlug') goalSlug: string,
    @Body() createProgressLogDto: CreateProgressLogDto,
  ) {
    return this.progressLogsService.create(goalSlug, createProgressLogDto)
  }
}
