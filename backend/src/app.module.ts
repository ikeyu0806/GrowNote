import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GoalsModule } from './goals/goals.module'
import { ProgressLogsModule } from './progress-logs/progress-logs.module'
import { MilestonesModule } from './milestones/milestones.module'

@Module({
  imports: [GoalsModule, ProgressLogsModule, MilestonesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
