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

  @Post()
  create(
    @Param('goalSlug') goalSlug: string,
    @Body() createProgressLogDto: CreateProgressLogDto,
  ) {
    return this.progressLogsService.create(goalSlug, createProgressLogDto)
  }
}
