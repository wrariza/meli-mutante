import { Matrix } from './Matrix.model'
import DinamicMatrix from './DinamicMatrix.model'

export class FindMutanDna {
  matrix: Matrix
  dinamicMatrix: DinamicMatrix

  constructor(dna: string[]) {
    this.matrix = new Matrix(dna)
    this.dinamicMatrix = new DinamicMatrix(this.matrix)
  }

  run() {
    return this.dinamicMatrix.detect()
  }
}
