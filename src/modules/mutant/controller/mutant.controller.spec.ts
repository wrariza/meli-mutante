import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MutantController } from './mutant.controller'
import { SMutan } from '../../../bin/constants_injection'
import { MutantService } from '../service/mutant.service'
import { statsMock } from '../../../../test/mocks/statsMock'

describe('Mutant Controller', () => {
  let controller: MutantController
  let service: MutantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantController,
        {
          provide: SMutan,
          useValue: {
            detect: () => true,
            stats: () => {
              return statsMock
            }
          }
        }
      ]
    }).compile()

    controller = module.get<MutantController>(MutantController)
    service = module.get<MutantService>(SMutan)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('Should call post mutant', async () => {
    jest.spyOn(service, 'detect').mockImplementation(() => true)

    const res = {
      status: function(responseStatus) {
        expect(responseStatus).toEqual(HttpStatus.OK)

        const send = function send() {
          return true
        }
        return { send }
      }
    }

    expect(
      await controller.mutant(res, [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ])
    ).toEqual(true)
  })

  it('Should call post mutant', async () => {
    jest.spyOn(service, 'detect').mockImplementation(() => false)

    const res = {
      status: function(responseStatus) {
        expect(responseStatus).toEqual(HttpStatus.FORBIDDEN)

        const send = function send() {
          return false
        }
        return { send }
      }
    }

    expect(
      await controller.mutant(res, [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ])
    ).toEqual(false)
  })

  it('Should call get stats', async () => {
    const mock = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      count_mutant_dna: 40,
      // eslint-disable-next-line @typescript-eslint/camelcase
      count_human_dna: 100,
      ratio: 0.4
    }
    jest.spyOn(service, 'stats').mockImplementation(async () => {
      return mock
    })

    expect(await controller.stats()).toEqual(mock)
  })
})
2
