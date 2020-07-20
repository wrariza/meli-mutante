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
import { Stats } from '../../../domain/models/stats/Stats.model'

@Controller('')
export class MutantController {
  constructor(@Inject(SMutan) private mutantService: MutantService) {}

  @Post('mutant')
  mutant(@Res() response, @Body('dna') dna: string[]): Promise<boolean> {
    if (this.mutantService.detect(dna)) {
      return response.status(HttpStatus.OK).send()
    }
    return response.status(HttpStatus.FORBIDDEN).send()
  }

  @Get('stats')
  stats(): Promise<Stats> {
    return this.mutantService.stats()
  }
}
