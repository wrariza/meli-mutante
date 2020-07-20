// Inject
import { SMutan, RMutan } from '../../../bin/constants_injection'

// Service
import { MutantService } from '../service/mutant.service'

// Repository
import { MutantRepository } from '../repository/mutant.repository'

export const serviceMutanProvider = {
  provide: SMutan,
  useClass: MutantService
}

export const repositoryProvider = {
  provide: RMutan,
  useClass: MutantRepository
}
