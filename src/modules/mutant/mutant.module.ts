import { Module } from '@nestjs/common'

// Controller
import { MutantController } from './controller/mutant.controller'

@Module({
  controllers: [MutantController]
})
export class MutantModule {}
