import { strategyMock } from './../../../../test/mocks/strategyMock'
import { DetectDna } from './DetectDna.model'
import { Dna } from '../dna/Dna.model'

describe('Class DetectDna', () => {
  let detectDna: DetectDna
  let detectDnaMutan: DetectDna

  beforeEach(async () => {
    const dna = new Dna([
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG'
    ])
    const dnaMutan = new Dna([
      'CTGAGA',
      'CTATGC',
      'TAATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG'
    ])
    detectDna = new DetectDna(dna)
    detectDnaMutan = new DetectDna(dnaMutan)
    detectDna.setStrategys(strategyMock(detectDna))
    detectDnaMutan.setStrategys(strategyMock(detectDnaMutan))
  })

  it('Should be defined', () => {
    expect(detectDna).toBeDefined()
  })

  it('Should set setStrategys', () => {
    expect(detectDna.strategys).toEqual(strategyMock(detectDna))
  })

  it('Shuld run stategys and find mutant dna return false', () => {
    const isMutan = detectDna.run()
    expect(isMutan).toEqual(false)
  })

  it('Shuld run stategys and find mutant dna return true', () => {
    const isMutanMutan = detectDnaMutan.run()
    expect(isMutanMutan).toEqual(true)
  })
})
