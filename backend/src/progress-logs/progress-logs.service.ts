import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProgressLogDto } from './dto/create-progress-log.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class ProgressLogsService {
  async findAll(goalSlug: string) {
    // Goal が存在するかチェック
    const goal = await prisma.goal.findUnique({
      where: { slug: goalSlug },
      include: { ProgressLog: true },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${goalSlug}" not found`)
    }

    return {
      goalSlug,
      progressLogs: goal.ProgressLog,
    }
  }

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
        date: new Date(createProgressLogDto.date),
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

  async getBarGraph(goalSlug: string) {
    const goal = await prisma.goal.findUnique({
      where: { slug: goalSlug },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${goalSlug}" not found`)
    }

    // 日別に勉強時間を合計
    const logs = await prisma.progressLog.groupBy({
      by: ['date'],
      where: { goalId: goal.id },
      _sum: {
        studyTime: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return {
      goalSlug,
      logs: logs.map((l) => ({
        date: l.date.toISOString().split('T')[0], // "YYYY-MM-DD"形式
        studyTime: l._sum.studyTime ?? 0,
      })),
    }
  }
}
