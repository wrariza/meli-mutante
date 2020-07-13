import { Observable } from 'rxjs'

export interface IMutanService {
  detect(dna: string[]): Observable<any>
}
