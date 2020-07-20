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
    const mock = { dna: '', human: true, mutant: false }
    jest.spyOn(repository, 'find').mockImplementation(async (dna: string) => {
      return await dnaModel.find({ dna: dna })
    })

    repository.create(mock).then(() => {
      expect(repository.create).toHaveBeenCalled()
      expect(repository.find).toHaveBeenCalled()
    })
  })
})
