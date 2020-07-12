import { Controller, Post, Get, Body, Inject } from '@nestjs/common'
import { MutantService } from '../service/mutant.service'
import { SMutan } from '../../../bin/constants_injection'

@Controller('')
export class MutantController {
  constructor(@Inject(SMutan) private mutantService: MutantService) {}

  @Post('mutant')
  detect(@Body('dna') dna: string[]) {
    return this.mutantService.detect(dna)
  }

  @Get('stats')
  statisticsMutant() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 }
  }
}
