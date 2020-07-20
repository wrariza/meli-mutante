import { Dna } from '../index'
import { Strategy } from '../index'
import { DetectDna } from '../index'

import { NITROGENOUS_MATCHS } from '../../enumns/nitrogenousMatchs.enums'
import { NITROGENOUS_NUMBERS } from '../../enumns/nitrogenousNumbers.enums'
import { NITROGENOUS_MOVES } from '../../enumns/nitrogenousMoves.enums'

export class FindMutanDna {
  dna: Dna
  detectDna: DetectDna

  constructor(dna: string[]) {
    this.dna = new Dna(dna)
    this.detectDna = new DetectDna(this.dna)
    this.detectDna.setStrategys(this.buildStrategysForMutan())
  }

  run(): boolean {
    if (this.dna.validSquenceAdn()) {
      return this.detectDna.run()
    } else {
      return false
    }
  }

  buildStrategysForMutan() {
    return [
      new Strategy(
        NITROGENOUS_MATCHS.horizontal,
        [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.one],
        NITROGENOUS_MOVES.right,
        NITROGENOUS_MOVES.left,
        NITROGENOUS_NUMBERS.zero,
        this.detectDna
      ),
      new Strategy(
        NITROGENOUS_MATCHS.vertical,
        [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.two],
        NITROGENOUS_MOVES.down,
        NITROGENOUS_MOVES.up,
        NITROGENOUS_NUMBERS.zero,
        this.detectDna
      ),
      new Strategy(
        NITROGENOUS_MATCHS.diagonalRight,
        [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.three],
        NITROGENOUS_MOVES.diagonalRight,
        NITROGENOUS_MOVES.diagonalRightReverse,
        NITROGENOUS_NUMBERS.zero,
        this.detectDna
      ),
      new Strategy(
        NITROGENOUS_MATCHS.diagonalLeft,
        [NITROGENOUS_NUMBERS.one, NITROGENOUS_NUMBERS.two],
        NITROGENOUS_MOVES.diagonalLeft,
        NITROGENOUS_MOVES.diagonalLeftReverse,
        NITROGENOUS_NUMBERS.zero,
        this.detectDna
      )
    ]
  }
}
