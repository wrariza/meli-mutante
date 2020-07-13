import { Injectable } from '@nestjs/common'
import { IMutanService } from '../../../domain/interfaces/Imutan.service'
import { FindMutanDna } from '../../../domain/models/FindMutanDna.model'
import { of, Observable } from 'rxjs'

@Injectable()
export class MutantService implements IMutanService {
  detect(dna: string[]): Observable<any> {
    return of(new FindMutanDna(dna).run())
  }
}
