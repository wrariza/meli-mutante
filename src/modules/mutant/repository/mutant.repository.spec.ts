import { Test, TestingModule } from '@nestjs/testing'

import { MutantRepository } from './mutant.repository'
import { Dna } from '../schemas/dna.schema'
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'

describe('Mutant Repository', () => {
  let repository: MutantRepository
  let dnaModel: Model<Dna>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantRepository,
        {
          provide: getModelToken(Dna.name),
          useValue: {
            find: () => {
              return []
            },
            stats: () => {
              return {
                // eslint-disable-next-line @typescript-eslint/camelcase
                count_mutant_dna: 40,
                // eslint-disable-next-line @typescript-eslint/camelcase
                count_human_dna: 100,
                ratio: 0.4
              }
            }
          }
        }
      ]
    }).compile()

    repository = module.get<MutantRepository>(MutantRepository)
    dnaModel = module.get<Model<Dna>>(getModelToken(Dna.name))
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('Shold be call repository create ', () => {
    jest.spyOn(repository, 'find').mockImplementation(async (dna: string) => {
      return await dnaModel.find({ dna: dna })
    })

    repository.stats().then(() => {
      expect(repository.create).toHaveBeenCalled()
      expect(repository.find).toHaveBeenCalled()
    })
  })

  it('Shold be call stats repository  ', () => {
    const mock = { dna: '', human: true, mutant: false }
    jest.spyOn(repository, 'stats').mockImplementation(async () => {
      return await {
        // eslint-disable-next-line @typescript-eslint/camelcase
        count_mutant_dna: 40,
        // eslint-disable-next-line @typescript-eslint/camelcase
        count_human_dna: 100,
        ratio: 0.4
      }
    })

    repository.create(mock).then(() => {
      expect(repository.stats).toHaveBeenCalled()
    })
  })
})
