export class Matrix {
  constructor(dna: string[]) {
    this.dna = dna
    this.size = dna.length
  }

  size: number
  dna: string[]
  currentColumn: number
}

// Mutan "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
// Human "dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
