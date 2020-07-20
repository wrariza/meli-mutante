export class Dna {
  private size: number
  private sequence: string[]
  private BASE_NITROGENOUS: string[]
  private totalQuadrant: number

  constructor(dna: string[]) {
    this.sequence = dna
    this.BASE_NITROGENOUS = ['A', 'G', 'T', 'C']
    this.size = dna.length
    this.totalQuadrant = (this.size / 2) * (this.size / 2)
  }

  private isValidSquenceComplete(): boolean {
    if (this.getSize() % 2 === 0) {
      return true
    }
    return false
  }

  private isValidSquenceParcial(): boolean {
    const dnaValidPartial = this.sequence.filter(dnaPartial => {
      return (
        dnaPartial.length % 2 === 0 &&
        (dnaPartial.length === this.size ? true : false)
      )
    })

    if (dnaValidPartial.length === this.getSize()) {
      return true
    }
    return false
  }

  validSquenceAdn(): boolean {
    if (this.isValidSquenceComplete() && this.isValidSquenceParcial()) {
      return true
    }
    return false
  }

  getBaseNitrogenous(): string[] {
    return this.BASE_NITROGENOUS
  }

  getSize(): number {
    return this.size
  }

  getSequence(): string[] {
    return this.sequence
  }

  getTotalQuadrant(): number {
    return this.totalQuadrant
  }
}

// Mutan "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
// Human "dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
