import { Injectable } from '@nestjs/common'

import { IMutanService } from '../../../domain/interfaces/Imutan.service'
import { FindMutanDna } from '../../../domain/models/index'

@Injectable()
export class MutantService implements IMutanService {
  detect(dna: string[]): boolean {
    return new FindMutanDna(dna).run()
  }
}
