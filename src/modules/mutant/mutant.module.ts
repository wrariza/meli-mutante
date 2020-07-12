import { Module } from '@nestjs/common'

// Controller
import { MutantController } from './controller/mutant.controller'

//Provider
import { serviceMutanProvider } from './providers/mutan.providers'

//Service
import { MutantService } from './service/mutant.service'

@Module({
  controllers: [MutantController],
  providers: [serviceMutanProvider, MutantService]
})
export class MutantModule {}
