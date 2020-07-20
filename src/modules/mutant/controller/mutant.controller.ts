import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  Res,
  HttpStatus
} from '@nestjs/common'
import { MutantService } from '../service/mutant.service'
import { SMutan } from '../../../bin/constants_injection'

@Controller('')
export class MutantController {
  constructor(@Inject(SMutan) private mutantService: MutantService) {}

  @Post('mutant')
  mutant(@Res() response, @Body('dna') dna: string[]) {
    if (this.mutantService.detect(dna)) {
      return response.status(HttpStatus.OK).send()
    }
    return response.status(HttpStatus.FORBIDDEN).send()
  }

  @Get('stats')
  stats() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 }
  }
}
