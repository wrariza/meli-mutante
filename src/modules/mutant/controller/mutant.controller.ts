import { Controller, Post, Get } from '@nestjs/common'

@Controller('')
export class MutantController {
  @Post('mutant')
  detectMutant() {
    return 'mutant'
  }

  @Get('stats')
  statisticsMutant() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 }
  }
}
