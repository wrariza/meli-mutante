import { Dna } from './Dna.model'

describe('Class Dna', () => {
  let dna: Dna
  let notValidDnaParcial: Dna
  let notValidDnaComplete: Dna

  beforeEach(async () => {
    dna = new Dna(['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'])
    notValidDnaParcial = new Dna(['ATGCGA', 'ATGC'])
    notValidDnaComplete = new Dna(['ATGCGA', 'CAGTGC', 'TTATTT'])
  })

  it('Should be defined', () => {
    expect(dna).toBeDefined()
  })

  it('Should be call validSquenceAdn return true', () => {
    expect(dna.validSquenceAdn()).toEqual(true)
  })

  it('Should be call validSquenceAdn return false', () => {
    expect(notValidDnaParcial.validSquenceAdn()).toEqual(false)
  })

  it('Should be call validSquenceAdn return false', () => {
    expect(notValidDnaComplete.validSquenceAdn()).toEqual(false)
  })
})
