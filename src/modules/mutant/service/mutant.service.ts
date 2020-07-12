import { Injectable } from '@nestjs/common'
import { IMutanService } from '../../../domain/interfaces/Imutan.service'
import { FindMutanDna } from 'src/domain/models/FindMutanDna.model'

@Injectable()
export class MutantService implements IMutanService {
  detect(dna: string[]) {
    const a = new FindMutanDna(dna).detect()
    a
    return a
  }
}
