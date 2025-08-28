import { Injectable } from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

@Injectable()
export class GoalsService {
  async create(data: {
    title: string
    description?: string
    target_date?: string
    status?: 'ongoing' | 'completed' | 'abandoned'
  }) {
    return prisma.goal.create({
      data: {
        slug: uuidv4(),
        title: data.title,
        description: data.description,
        targetDate: data.target_date ? new Date(data.target_date) : undefined,
        status: data.status ?? 'ongoing',
      },
    })
  }
}
