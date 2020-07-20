import { FindMutanDna } from '..'

describe('Class FindMutanDna', () => {
  let findMutanDna: FindMutanDna
  let findMutanDnaNotValid: FindMutanDna

  beforeEach(async () => {
    const dna: string[] = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG'
    ]
    const dnaHuman: string[] = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA'
    ]

    findMutanDna = new FindMutanDna(dna)
    findMutanDnaNotValid = new FindMutanDna(dnaHuman)
  })

  it('Should be defined', () => {
    expect(findMutanDna).toBeDefined()
  })

  it('Should be called run and ruturn false', () => {
    expect(findMutanDna.run()).toEqual(false)
  })

  it('Should be called run and ruturn false', () => {
    expect(findMutanDnaNotValid.run()).toEqual(false)
  })
})
