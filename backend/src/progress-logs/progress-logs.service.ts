import { Injectable } from '@nestjs/common';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';

@Injectable()
export class ProgressLogsService {
  create(createProgressLogDto: CreateProgressLogDto) {
    return 'This action adds a new progressLog';
  }

  findAll() {
    return `This action returns all progressLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressLog`;
  }

  update(id: number, updateProgressLogDto: UpdateProgressLogDto) {
    return `This action updates a #${id} progressLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressLog`;
  }
}
