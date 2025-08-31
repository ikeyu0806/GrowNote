import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressLogsService } from './progress-logs.service';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';

@Controller('progress-logs')
export class ProgressLogsController {
  constructor(private readonly progressLogsService: ProgressLogsService) {}

  @Post()
  create(@Body() createProgressLogDto: CreateProgressLogDto) {
    return this.progressLogsService.create(createProgressLogDto);
  }

  @Get()
  findAll() {
    return this.progressLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressLogDto: UpdateProgressLogDto) {
    return this.progressLogsService.update(+id, updateProgressLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressLogsService.remove(+id);
  }
}
