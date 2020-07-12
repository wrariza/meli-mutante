import { QUADRANTS } from '../enumns/quadrants.enums'
import { QUADRANTS_NUMBERS } from '../enumns/quadrants_numbers'
import { QUADRANT_MATCHS } from '../enumns/quadrants_matchs'
import { QUADRANT_MOVES } from '../enumns/quadrant_moves'
import { Strategy } from './Strategy.model'
import { Quadrant } from './Quadrant.model'

export class FindMutanDna {
  constructor(dna: string[]) {
    this.dna = dna
    this.size = dna.length
    this.matchLetter = ''
    this.buildCurrentMatrix()
  }

  dinamicMatrix2x2: Record<QUADRANTS, Quadrant> = {
    one: {
      row: QUADRANTS_NUMBERS.zero,
      column: QUADRANTS_NUMBERS.zero
    },
    two: {
      row: QUADRANTS_NUMBERS.zero,
      column: QUADRANTS_NUMBERS.one
    },
    three: {
      row: QUADRANTS_NUMBERS.one,
      column: QUADRANTS_NUMBERS.zero
    },
    four: {
      row: QUADRANTS_NUMBERS.one,
      column: QUADRANTS_NUMBERS.one
    }
  }

  strategys: Strategy[] = [
    {
      name: QUADRANT_MATCHS.horizontal,
      match: [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.one],
      moveDone: QUADRANT_MOVES.right,
      moveReversed: QUADRANT_MOVES.left,
      matchLetterPostion: QUADRANTS_NUMBERS.zero
    },
    {
      name: QUADRANT_MATCHS.vertical,
      match: [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.two],
      moveDone: QUADRANT_MOVES.down,
      moveReversed: QUADRANT_MOVES.up,
      matchLetterPostion: QUADRANTS_NUMBERS.zero
    },
    {
      name: QUADRANT_MATCHS.diagonalRight,
      match: [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.three],
      moveDone: QUADRANT_MOVES.diagonalRight,
      moveReversed: QUADRANT_MOVES.diagonalRightReverse,
      matchLetterPostion: QUADRANTS_NUMBERS.zero
    },
    {
      name: QUADRANT_MATCHS.diagonalLeft,
      match: [QUADRANTS_NUMBERS.one, QUADRANTS_NUMBERS.two],
      moveDone: QUADRANT_MOVES.diagonalLeft,
      moveReversed: QUADRANT_MOVES.diagonalLeftReverse,
      matchLetterPostion: QUADRANTS_NUMBERS.zero
    }
  ]

  size: number
  dna: string[]
  matchLetter: string
  currentMatrix: string[]

  detect() {
    const quadrantTotal = (this.size / 2) * (this.size / 2)
    let currentColumn = 1

    while (currentColumn <= quadrantTotal) {
      this.validMoveAndFinalQuadrantColumn(currentColumn, quadrantTotal)

      if (this.applyStrategys()) {
        return true
      }

      currentColumn += 1
    }

    return false
  }

  applyStrategys() {
    return this.strategys.some(s => {
      return this.strategy(
        s.match,
        s.moveDone,
        s.moveReversed,
        s.matchLetterPostion
      )
    })
  }

  validMoveAndFinalQuadrantColumn(
    currentColumn: number,
    quadrantLengs: number
  ) {
    const isLastColumn = currentColumn % (this.size / 2) === 0

    if (currentColumn !== quadrantLengs) {
      if (isLastColumn) {
        this.moveRowDow()
      } else {
        this.moveRight()
      }
      this.buildCurrentMatrix()
    }
  }

  strategy(
    match,
    moveDone?: QUADRANT_MOVES,
    moveReversed?: QUADRANT_MOVES,
    letter = QUADRANTS_NUMBERS.zero
  ): boolean {
    if (this.matchQuadrant(match)) {
      this.setMatchLetter(this.currentMatrix[letter])
      this[moveDone]()
      this.buildCurrentMatrix()
      return this.strategyDeep(match, moveReversed, letter)
    } else {
      return false
    }
  }

  strategyDeep(match, moveReversed: QUADRANT_MOVES, letterPosition: number) {
    if (
      this.matchQuadrant(match) &&
      this.matchLetter === this.currentMatrix[letterPosition]
    ) {
      return true
    } else {
      this[moveReversed]()
      this.buildCurrentMatrix()
      this.clearMatchLetter()
    }
  }

  setMatchLetter(letter: string): void {
    this.matchLetter = letter
  }

  clearMatchLetter(): void {
    this.matchLetter = ''
  }

  buildCurrentMatrix(): void {
    this.currentMatrix = []

    for (const q in QUADRANTS) {
      this.currentMatrix.push(
        this.dna[this.dinamicMatrix2x2[q].row][this.dinamicMatrix2x2[q].column]
      )
    }
  }

  matchQuadrant(match) {
    if (this.currentMatrix[match[0]] === this.currentMatrix[match[1]]) {
      return true
    }

    return false
  }

  moveRight(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].column += 2
    }
  }

  moveLeft(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].column -= 2
    }
  }

  moveDown(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row += 2
    }
  }

  moveUp(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row -= 2
    }
  }

  moveDiagonalRight(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row += 2
      this.dinamicMatrix2x2[quadrant].column += 2
    }
  }

  moveDiagonalRightReverse(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row -= 2
      this.dinamicMatrix2x2[quadrant].column -= 2
    }
  }

  moveDiagonalLeft() {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row -= 2
      this.dinamicMatrix2x2[quadrant].column += 2
    }
  }

  moveDiagonalLeftReverse(): void {
    for (const quadrant in QUADRANTS) {
      this.dinamicMatrix2x2[quadrant].row += 2
      this.dinamicMatrix2x2[quadrant].column -= 2
    }
  }

  moveRowDow(): void {
    this.dinamicMatrix2x2[QUADRANTS.one].row += 2
    this.dinamicMatrix2x2[QUADRANTS.one].column = 0

    this.dinamicMatrix2x2[QUADRANTS.two].row += 2
    this.dinamicMatrix2x2[QUADRANTS.two].column = 1

    this.dinamicMatrix2x2[QUADRANTS.three].row += 2
    this.dinamicMatrix2x2[QUADRANTS.three].column = 0

    this.dinamicMatrix2x2[QUADRANTS.four].row += 2
    this.dinamicMatrix2x2[QUADRANTS.four].column = 1
  }
}

// Mutan "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
// Human "dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
// const a = new FindMutanDna([
//   'ATGCGA',
//   'CAGTGC',
//   'TTATTT',
//   'AGACGG',
//   'GCGTCA',
//   'TCACTG'
// ])

// a.detect()
