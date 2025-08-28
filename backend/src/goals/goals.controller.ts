import { Controller, Get, Post, Body } from '@nestjs/common'
import { GoalsService } from './goals.service'

@Controller('api/internal/goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  findAll() {
    return this.goalsService.findAll()
  }

  @Post()
  async create(
    @Body()
    body: {
      title: string
      description?: string
      target_date?: string
      status?: 'ongoing' | 'completed' | 'abandoned'
    },
  ) {
    return this.goalsService.create(body)
  }
}
