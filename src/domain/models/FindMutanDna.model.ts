import { Matrix } from './Matrix.model'
import DinamicMatrix from './DinamicMatrix.model'

export class FindMutanDna {
  constructor(dna: string[]) {
    this.matrix = new Matrix(dna)
    this.dinamicMatrix = new DinamicMatrix(this.matrix)
  }
  matrix: Matrix
  dinamicMatrix: DinamicMatrix

  run() {
    return this.dinamicMatrix.detect()
  }
}
