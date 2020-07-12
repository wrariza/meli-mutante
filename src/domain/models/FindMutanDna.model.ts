// import { QUADRANTS } from '../enumns/enums'

export enum QUADRANTS {
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four'
}

export class FindMutanDna {
  constructor(dna: string[]) {
    this.dna = dna
    this.size = dna.length
    this.matchLetter = ''
  }

  dinamicMatrix2x2 = {
    one: {
      row: 0,
      column: 0
    },
    two: {
      row: 0,
      column: 1
    },
    three: {
      row: 1,
      column: 0
    },
    four: {
      row: 1,
      column: 1
    }
  }

  size: number
  dna: string[]
  matchLetter: string
  currentMatrix: string[]

  detect() {
    this.buildCurrentMatrix()
    const endcolumns = this.size - 1
    let n = 0

    while (n < endcolumns) {
      if (
        this.strategy('horizontalMatch', 'moveRight', 'moveLeft') ||
        this.strategy('verticalMatch', 'moveDown', 'moveUp') ||
        this.strategy(
          'diagonalRightMatch',
          'moveDiagonalRight',
          'moveDiagonalRightReverse'
        ) ||
        this.strategy(
          'diagonalLeftMatch',
          'moveDiagonalLeft',
          'moveDiagonalLeftReverse',
          1
        )
      ) {
        return true
      }
      if ((this.size / 2) % n == 0) {
        this.moveRowDow()
      } else {
        this.moveRight()
      }
      this.buildCurrentMatrix()
      n += 1
    }
  }

  strategy(match, moveDone?, moveReversed?, letter = 0): boolean {
    if (this[match]()) {
      this.setMatchLetter(this.currentMatrix[0])
      this[moveDone]()
      this.buildCurrentMatrix()
      return this.strategyDeep(match, moveReversed, letter)
    } else {
      return false
    }
  }

  strategyDeep(match, moveReversed, letter) {
    if (this[match]() && this.matchLetter === this.currentMatrix[letter]) {
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

  horizontalMatch(): boolean {
    if (this.currentMatrix[0] === this.currentMatrix[1]) return true
    return false
  }

  verticalMatch(): boolean {
    if (this.currentMatrix[0] === this.currentMatrix[2]) return true
    return false
  }

  diagonalRightMatch(): boolean {
    if (this.currentMatrix[0] === this.currentMatrix[3]) return true
    return false
  }

  diagonalLeftMatch(): boolean {
    if (this.currentMatrix[1] === this.currentMatrix[2]) return true
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
      this.dinamicMatrix2x2[quadrant].row += 2
      this.dinamicMatrix2x2[quadrant].column += 2
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
