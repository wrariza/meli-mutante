import { Injectable, Inject } from '@nestjs/common'

import { IMutanService } from '../../../domain/interfaces/Imutan.service'

import { MutantRepository } from '../repository/mutant.repository'
import { RMutan } from '../../../bin/constants_injection'
import { CreateDnaDto } from '../dto/create-dna.dto'
import { Stats } from '../../../domain/models/stats/Stats.model'
import { FindMutanDna } from '../../../domain/models/findMutanDna/FindMutanDna.model'

@Injectable()
export class MutantService implements IMutanService {
  @Inject(RMutan) private mutantRepository: MutantRepository

  buildDnaCreateDto(
    dna: string[],
    human = false,
    mutant = false
  ): CreateDnaDto {
    return {
      dna: dna.join(''),
      human: human,
      mutant: mutant
    }
  }

  detect(dna: string[]): boolean {
    const mutant = new FindMutanDna(dna).run()
    const human = !mutant
    this.mutantRepository.create(this.buildDnaCreateDto(dna, human, mutant))
    return mutant
  }

  async stats(): Promise<Stats> {
    return this.mutantRepository.stats()
  }
}
