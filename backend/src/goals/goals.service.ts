import { Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll() {
    return prisma.goal.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async findBySlug(slug: string) {
    const goal = await prisma.goal.findUnique({
      where: { slug },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${slug}" not found`)
    }

    return goal
  }

  async updateBySlug(
    slug: string,
    data: {
      title?: string
      description?: string
      target_date?: string
      status?: 'ongoing' | 'completed' | 'abandoned'
    },
  ) {
    const goal = await prisma.goal.findUnique({ where: { slug } })
    if (!goal) throw new NotFoundException(`Goal with slug "${slug}" not found`)

    return prisma.goal.update({
      where: { slug },
      data: {
        title: data.title ?? goal.title,
        description: data.description ?? goal.description,
        targetDate: data.target_date
          ? new Date(data.target_date)
          : goal.targetDate,
        status: data.status ?? goal.status,
      },
    })
  }
}
