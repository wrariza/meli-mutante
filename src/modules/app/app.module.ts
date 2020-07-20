import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { MongooseModule } from '@nestjs/mongoose'

// Modules
import { CoreModule } from '../core/core.module'
import { MutantModule } from '../mutant/mutant.module'

// Controllers
import { HealthController } from './health/health.controller'

@Module({
  imports: [
    TerminusModule,
    CoreModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dna'),
    MutantModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
