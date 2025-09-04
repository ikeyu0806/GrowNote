import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMilestoneDto } from './dto/create-milestone.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class MilestonesService {
  async findAll(goalSlug: string) {
    const goal = await prisma.goal.findUnique({
      where: { slug: goalSlug },
      include: { Milestone: true },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${goalSlug}" not found`)
    }

    return {
      goalSlug,
      milestones: goal.Milestone,
    }
  }

  async create(goalSlug: string, createMilestoneDto: CreateMilestoneDto) {
    const goal = await prisma.goal.findUnique({
      where: { slug: goalSlug },
    })

    if (!goal) {
      throw new NotFoundException(`Goal with slug "${goalSlug}" not found`)
    }

    const milestone = await prisma.milestone.create({
      data: {
        goalId: goal.id,
        title: createMilestoneDto.title,
        dueDate: createMilestoneDto.dueDate
          ? new Date(createMilestoneDto.dueDate)
          : undefined,
        status: createMilestoneDto.status ?? 'not_started',
      },
    })

    return {
      message: 'Milestone created',
      goalSlug,
      data: milestone,
    }
  }
}
