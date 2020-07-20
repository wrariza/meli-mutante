import { Test, TestingModule } from '@nestjs/testing'
import { MutantService } from './mutant.service'
import { RMutan } from '../../../bin/constants_injection'
import { MutantRepository } from '../repository/mutant.repository'

describe('MutantService', () => {
  let service: MutantService
  let repository: MutantRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantService,
        {
          provide: RMutan,
          useValue: {
            create: () => {
              return {}
            }
          }
        }
      ]
    }).compile()

    service = module.get<MutantService>(MutantService)
    repository = module.get<MutantRepository>(RMutan)

    jest.spyOn(repository, 'create').mockImplementation()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should call detect mutant return true', async () => {
    expect(
      await service.detect([
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ])
    ).toEqual(false)
  })

  it('Should call detect mutant return false', async () => {
    expect(
      await service.detect([
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ])
    ).toEqual(true)
  })
})
