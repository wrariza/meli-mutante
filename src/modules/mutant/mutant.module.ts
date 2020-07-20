import { Module } from '@nestjs/common'

// Controller
import { MutantController } from './controller/mutant.controller'

//Provider
import {
  serviceMutanProvider,
  repositoryProvider
} from './providers/mutan.providers'

//Service
import { MutantService } from './service/mutant.service'
import { MutantRepository } from './repository/mutant.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Dna, DnaShema } from './schemas/dna.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Dna.name, schema: DnaShema }])],
  controllers: [MutantController],
  providers: [
    MutantRepository,
    repositoryProvider,
    serviceMutanProvider,
    MutantService
  ]
})
export class MutantModule {}
