import { Injectable } from '@nestjs/common'
import { CreateProgressLogDto } from './dto/create-progress-log.dto'

@Injectable()
export class ProgressLogsService {
  create(goalSlug: string, createProgressLogDto: CreateProgressLogDto) {
    // ここで DB に保存
    // 例: goalSlug に対応する Goal を探して、その Goal に progress_log を紐付ける
    return {
      message: 'Progress log created',
      goalSlug,
      data: createProgressLogDto,
    }
  }
}
