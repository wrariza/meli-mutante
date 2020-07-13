export class Matrix {
  size: number
  dna: string[]
  currentColumn: number

  constructor(dna: string[]) {
    this.dna = dna
    this.size = dna.length
  }
}

// Mutan "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
// Human "dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
