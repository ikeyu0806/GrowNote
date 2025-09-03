import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { MilestonesService } from './milestones.service'
import { CreateMilestoneDto } from './dto/create-milestone.dto'

@Controller('api/internal/goals/:goalSlug/milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}

  @Get()
  async findAll(@Param('goalSlug') goalSlug: string) {
    return this.milestonesService.findAll(goalSlug)
  }

  @Post()
  async create(
    @Param('goalSlug') goalSlug: string,
    @Body() createMilestoneDto: CreateMilestoneDto,
  ) {
    return this.milestonesService.create(goalSlug, createMilestoneDto)
  }
}
