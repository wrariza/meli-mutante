import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

// Modules
import { CoreModule } from '../core/core.module'
import { MutantModule } from '../mutant/mutant.module'

// Controllers
import { HealthController } from './health/health.controller'

@Module({
  imports: [TerminusModule, CoreModule, MutantModule],
  controllers: [HealthController]
})
export class AppModule {}
