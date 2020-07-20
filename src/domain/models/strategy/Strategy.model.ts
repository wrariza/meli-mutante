import { NITROGENOUS_MATCHS } from '../../enumns/nitrogenousMatchs.enums'
import { NITROGENOUS_NUMBERS } from '../../enumns/nitrogenousNumbers.enums'
import { NITROGENOUS_MOVES } from '../../enumns/nitrogenousMoves.enums'
import { DetectDna } from '../index'

export class Strategy {
  name: NITROGENOUS_MATCHS
  match: NITROGENOUS_NUMBERS[]
  moveDone: NITROGENOUS_MOVES
  moveReversed: NITROGENOUS_MOVES
  matchLetterPostion: NITROGENOUS_NUMBERS
  detectDna: DetectDna

  constructor(
    name: NITROGENOUS_MATCHS,
    match: NITROGENOUS_NUMBERS[],
    moveDone: NITROGENOUS_MOVES,
    moveReversed: NITROGENOUS_MOVES,
    matchLetterPostion: NITROGENOUS_NUMBERS,
    detectDna: DetectDna
  ) {
    this.name = name
    this.match = match
    this.moveDone = moveDone
    this.moveReversed = moveReversed
    this.matchLetterPostion = matchLetterPostion
    this.detectDna = detectDna
  }

  run(): boolean {
    if (this.matchQuadrant()) {
      this.detectDna.setMatchLetter(
        this.detectDna.snapshot.values[this.matchLetterPostion]
      )
      this.detectDna[this.moveDone]()
      this.detectDna.buildCurrentNitrogenBase()
      return this.runDeep(this.matchLetterPostion)
    } else {
      return false
    }
  }

  runDeep(letterPosition: number) {
    if (
      this.matchQuadrant() &&
      this.detectDna.matchLetter ===
        this.detectDna.snapshot.values[letterPosition]
    ) {
      return true
    } else {
      this.detectDna[this.moveReversed]()
      this.detectDna.buildCurrentNitrogenBase()
      this.detectDna.clearMatchLetter()
    }
  }

  matchQuadrant(): boolean {
    const nitrogenBaseA: string = this.detectDna.snapshot.values[
      this.match[NITROGENOUS_NUMBERS.zero]
    ]
    const nitrogenBaseB: string = this.detectDna.snapshot.values[
      this.match[NITROGENOUS_NUMBERS.one]
    ]

    if (
      nitrogenBaseA === nitrogenBaseB &&
      this.detectDna.dna.getBaseNitrogenous().includes(nitrogenBaseA) &&
      this.detectDna.dna.getBaseNitrogenous().includes(nitrogenBaseB)
    ) {
      return true
    }

    return false
  }
}
