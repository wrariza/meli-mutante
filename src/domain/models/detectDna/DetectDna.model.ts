import { Strategy } from '../strategy/Strategy.model'
import { Dna } from '../dna/Dna.model'
import { NitrogenousBase } from '../nitrogenousBase/NitrogenousBase.model'
import { NITROGENOUS_POSITION_QUADRANT } from '../../enumns/nitrogenousPositionQuadrant.enums'
import { NITROGENOUS_NUMBERS } from '../../enumns/nitrogenousNumbers.enums'
import { Snapshot } from '../snapshot/Snapshot.model'
import { NITROGENOUS_MATCHS } from '../../../domain/enumns/nitrogenousMatchs.enums'

export class DetectDna {
  dna: Dna
  strategys: Strategy[]
  snapshot = new Snapshot()
  matchLetter: string
  private nitrogenBase: Record<
    NITROGENOUS_POSITION_QUADRANT,
    NitrogenousBase
  > = {
    // 2*2 se ajusta al caso actual
    one: {
      row: NITROGENOUS_NUMBERS.zero,
      column: NITROGENOUS_NUMBERS.zero
    },
    two: {
      row: NITROGENOUS_NUMBERS.zero,
      column: NITROGENOUS_NUMBERS.one
    },
    three: {
      row: NITROGENOUS_NUMBERS.one,
      column: NITROGENOUS_NUMBERS.zero
    },
    four: {
      row: NITROGENOUS_NUMBERS.one,
      column: NITROGENOUS_NUMBERS.one
    }
  }

  constructor(dna: Dna) {
    this.dna = dna
  }

  setStrategys(strategys: Strategy[]) {
    this.strategys = strategys
  }

  run(): boolean {
    this.buildCurrentNitrogenBase()
    let currentColumn = 1

    while (currentColumn <= this.dna.getTotalQuadrant()) {
      if (this.applyStrategys()) {
        return true
      }
      this.validMoveAndFinalQuadrantColumn(currentColumn)
      currentColumn += 1
    }

    return false
  }

  applyStrategys(): boolean {
    return this.strategys.some((s: Strategy) => {
      if (
        s.name === NITROGENOUS_MATCHS.diagonalLeft &&
        this.snapshot.isFristColumn
      ) {
        return false
      }

      if (
        s.name === NITROGENOUS_MATCHS.diagonalRight &&
        this.snapshot.isLastColumn
      ) {
        return false
      }

      return s.run()
    })
  }

  validMoveAndFinalQuadrantColumn(currentColumn: number): void {
    if (currentColumn !== this.dna.getTotalQuadrant()) {
      if (this.snapshot.isLastColumn) {
        this.moveRowDow()
        this.buildCurrentNitrogenBase()
        this.snapshot.isFristColumn = true
        this.snapshot.isLastColumn = false
      } else {
        this.moveRight()
        this.buildCurrentNitrogenBase()
        this.snapshot.isFristColumn = false
        this.snapshot.isLastColumn =
          (currentColumn + 1) % (this.dna.getSize() / 2) === 0
      }
    }
  }

  setMatchLetter(letter: string): void {
    this.matchLetter = letter
  }

  clearMatchLetter(): void {
    this.matchLetter = ''
  }

  buildCurrentNitrogenBase(): void {
    this.snapshot.reset()
    const values = []
    const sequence = this.dna.getSequence()

    for (const nitrogenousPosition in NITROGENOUS_POSITION_QUADRANT) {
      const row = this.nitrogenBase[nitrogenousPosition].row
      const column = this.nitrogenBase[nitrogenousPosition].column
      values.push(sequence[row][column])
    }

    this.snapshot.setValues(values)
  }

  moveRight(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].column += 2
    }
  }

  moveLeft(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].column -= 2
    }
  }

  moveDown(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row += 2
    }
  }

  moveUp(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row -= 2
    }
  }

  moveDiagonalRight(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row += 2
      this.nitrogenBase[quadrant].column += 2
    }
  }

  moveDiagonalRightReverse(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row -= 2
      this.nitrogenBase[quadrant].column -= 2
    }
  }

  moveDiagonalLeft(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row += 2
      this.nitrogenBase[quadrant].column -= 2
    }
  }

  moveDiagonalLeftReverse(): void {
    for (const quadrant in NITROGENOUS_POSITION_QUADRANT) {
      this.nitrogenBase[quadrant].row -= 2
      this.nitrogenBase[quadrant].column += 2
    }
  }

  moveRowDow(): void {
    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.one].row += 2
    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.one].column = 0

    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.two].row += 2
    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.two].column = 1

    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.three].row += 2
    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.three].column = 0

    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.four].row += 2
    this.nitrogenBase[NITROGENOUS_POSITION_QUADRANT.four].column = 1
  }
}
