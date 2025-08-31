// src/progress-logs/dto/create-progress-log.dto.ts
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  Min,
  Max,
  IsEnum,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Mood } from '../../../generated/prisma'

export class CreateProgressLogDto {
  @IsDateString()
  date: string // ISO8601形式の日付

  @IsString()
  content: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  studyTime?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  progressRate?: number

  @IsOptional()
  @IsEnum(Mood)
  mood?: Mood
}
