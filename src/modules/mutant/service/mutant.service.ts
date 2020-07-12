import { Injectable } from '@nestjs/common'
import { IMutanService } from '../../../domain/interfaces/Imutan.service'
import { FindMutanDna } from '../../../domain/models/FindMutanDna.model'

@Injectable()
export class MutantService implements IMutanService {
  detect(dna: string[]) {
    return new FindMutanDna(dna).detect()
  }
}
