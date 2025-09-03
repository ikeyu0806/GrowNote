import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateMilestoneDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsDateString()
  @IsOptional()
  dueDate?: string

  @IsEnum(['not_started', 'in_progress', 'done'])
  @IsOptional()
  status?: 'not_started' | 'in_progress' | 'done'
}
