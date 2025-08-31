import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProgressLogDto } from './dto/create-progress-log.dto'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

@Injectable()
export class ProgressLogsService {
  async create(goalSlug: string, createProgressLogDto: CreateProgressLogDto) {
    const goal = await prisma.goal.findUnique({
      where: { slug: goalSlug },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${goalSlug}" not found`)
    }

    // progress_log を作成
    const progressLog = await prisma.progressLog.create({
      data: {
        goalId: goal.id, // 外部キー
        date: createProgressLogDto.date,
        content: createProgressLogDto.content,
        studyTime: createProgressLogDto.studyTime,
        progressRate: createProgressLogDto.progressRate,
        mood: createProgressLogDto.mood,
      },
    })

    return {
      message: 'Progress log created',
      goalSlug,
      data: progressLog,
    }
  }
}
