// Inject
import { SMutan } from '../../../bin/constants_injection'

// Service
import { MutantService } from '../service/mutant.service'

export const serviceMutanProvider = {
  provide: SMutan,
  useClass: MutantService
}
