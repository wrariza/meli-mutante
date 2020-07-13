import { Controller, Post, Get, Body, Inject } from '@nestjs/common'
import { MutantService } from '../service/mutant.service'
import { SMutan } from '../../../bin/constants_injection'
import { Observable } from 'rxjs'

@Controller('')
export class MutantController {
  constructor(@Inject(SMutan) private mutantService: MutantService) {}

  @Post('mutant')
  mutant(@Body('dna') dna: string[]): Observable<any> {
    return this.mutantService.detect(dna)
  }

  @Get('stats')
  stats() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 }
  }
}
