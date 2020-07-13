import { QUADRANT_MATCHS } from '../enumns/quadrants_matchs'
import { QUADRANTS_NUMBERS } from '../enumns/quadrants_numbers'
import { QUADRANT_MOVES } from '../enumns/quadrant_moves'
import DinamicMatrix from './DinamicMatrix.model'

export class Strategy {
  name: QUADRANT_MATCHS
  match: QUADRANTS_NUMBERS[]
  moveDone: QUADRANT_MOVES
  moveReversed: QUADRANT_MOVES
  matchLetterPostion: QUADRANTS_NUMBERS
  dinamicMatrix: DinamicMatrix

  constructor(
    name: QUADRANT_MATCHS,
    match: QUADRANTS_NUMBERS[],
    moveDone: QUADRANT_MOVES,
    moveReversed: QUADRANT_MOVES,
    matchLetterPostion: QUADRANTS_NUMBERS,
    dinamicMatrix: DinamicMatrix
  ) {
    this.name = name
    this.match = match
    this.moveDone = moveDone
    this.moveReversed = moveReversed
    this.matchLetterPostion = matchLetterPostion
    this.dinamicMatrix = dinamicMatrix
  }

  run(): boolean {
    if (this.matchQuadrant()) {
      this.dinamicMatrix.setMatchLetter(
        this.dinamicMatrix.snapshot[this.matchLetterPostion]
      )
      this.dinamicMatrix[this.moveDone]()
      this.dinamicMatrix.update()
      return this.runDeep(this.matchLetterPostion)
    } else {
      return false
    }
  }

  runDeep(letterPosition: number) {
    if (
      this.matchQuadrant() &&
      this.dinamicMatrix.matchLetter ===
        this.dinamicMatrix.snapshot[letterPosition]
    ) {
      return true
    } else {
      this.dinamicMatrix[this.moveReversed]()
      this.dinamicMatrix.update()
      this.dinamicMatrix.clearMatchLetter()
    }
  }

  matchQuadrant(): boolean {
    if (
      this.dinamicMatrix.snapshot[this.match[0]] ===
      this.dinamicMatrix.snapshot[this.match[1]]
    ) {
      return true
    }

    return false
  }
}
