import { Strategy } from './Strategy.model'
import { Matrix } from './Matrix.model'
import { QUADRANTS } from '../enumns/quadrants.enums'
import { Quadrant } from './Quadrant.model'
import { QUADRANTS_NUMBERS } from '../enumns/quadrants_numbers'
import { QUADRANT_MATCHS } from '../enumns/quadrants_matchs'
import { QUADRANT_MOVES } from '../enumns/quadrant_moves'

export default class DinamicMatrix {
  constructor(matrix: Matrix) {
    this.matrix = matrix
    this.strategys = [
      new Strategy(
        QUADRANT_MATCHS.horizontal,
        [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.one],
        QUADRANT_MOVES.right,
        QUADRANT_MOVES.left,
        QUADRANTS_NUMBERS.zero,
        this
      ),
      new Strategy(
        QUADRANT_MATCHS.vertical,
        [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.two],
        QUADRANT_MOVES.down,
        QUADRANT_MOVES.up,
        QUADRANTS_NUMBERS.zero,
        this
      ),
      new Strategy(
        QUADRANT_MATCHS.diagonalRight,
        [QUADRANTS_NUMBERS.zero, QUADRANTS_NUMBERS.three],
        QUADRANT_MOVES.diagonalRight,
        QUADRANT_MOVES.diagonalRightReverse,
        QUADRANTS_NUMBERS.zero,
        this
      ),
      new Strategy(
        QUADRANT_MATCHS.diagonalLeft,
        [QUADRANTS_NUMBERS.one, QUADRANTS_NUMBERS.two],
        QUADRANT_MOVES.diagonalLeft,
        QUADRANT_MOVES.diagonalLeftReverse,
        QUADRANTS_NUMBERS.zero,
        this
      )
    ]
  }

  matrix: Matrix
  strategys: Strategy[]
  snapshot: string[]
  matchLetter: string

  quadrantDinamic: Record<QUADRANTS, Quadrant> = {
    // 2*2 se ajusta al caso actual
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

  detect(): boolean {
    const quadrantTotal = (this.matrix.size / 2) * (this.matrix.size / 2)
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

  applyStrategys(): boolean {
    return this.strategys.some((s: Strategy) => {
      return s.run()
    })
  }

  validMoveAndFinalQuadrantColumn(
    currentColumn: number,
    quadrantLengs: number
  ): void {
    const isLastColumn = currentColumn % (this.matrix.size / 2) === 0

    if (currentColumn !== quadrantLengs) {
      if (isLastColumn) {
        this.moveRowDow()
      } else {
        this.moveRight()
      }
      this.update()
    }
  }

  setMatchLetter(letter: string): void {
    this.matchLetter = letter
  }

  clearMatchLetter(): void {
    this.matchLetter = ''
  }

  update(): void {
    this.snapshot = []

    for (const q in QUADRANTS) {
      this.snapshot.push(
        this.matrix.dna[this.quadrantDinamic[q].row][
          this.quadrantDinamic[q].column
        ]
      )
    }
  }

  moveRight(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].column += 2
    }
  }

  moveLeft(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].column -= 2
    }
  }

  moveDown(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row += 2
    }
  }

  moveUp(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row -= 2
    }
  }

  moveDiagonalRight(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row += 2
      this.quadrantDinamic[quadrant].column += 2
    }
  }

  moveDiagonalRightReverse(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row -= 2
      this.quadrantDinamic[quadrant].column -= 2
    }
  }

  moveDiagonalLeft(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row -= 2
      this.quadrantDinamic[quadrant].column += 2
    }
  }

  moveDiagonalLeftReverse(): void {
    for (const quadrant in QUADRANTS) {
      this.quadrantDinamic[quadrant].row += 2
      this.quadrantDinamic[quadrant].column -= 2
    }
  }

  moveRowDow(): void {
    this.quadrantDinamic[QUADRANTS.one].row += 2
    this.quadrantDinamic[QUADRANTS.one].column = 0

    this.quadrantDinamic[QUADRANTS.two].row += 2
    this.quadrantDinamic[QUADRANTS.two].column = 1

    this.quadrantDinamic[QUADRANTS.three].row += 2
    this.quadrantDinamic[QUADRANTS.three].column = 0

    this.quadrantDinamic[QUADRANTS.four].row += 2
    this.quadrantDinamic[QUADRANTS.four].column = 1
  }
}
