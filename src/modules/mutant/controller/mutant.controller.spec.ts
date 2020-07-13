import { Test, TestingModule } from '@nestjs/testing'
import { MutantController } from './mutant.controller'
import { SMutan } from '../../../bin/constants_injection'
import { MutantService } from '../service/mutant.service'
import { statsMock } from '../../../../test/mocks/statsMock'
import { of } from 'rxjs'

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
            detect: () => of(true),
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

  it('Should call post mutant', done => {
    const postMutantSpy = jest.spyOn(service, 'detect')

    controller.mutant(['', '', '', '', '', '']).subscribe((r: any) => {
      expect(postMutantSpy).toHaveBeenCalled()
      expect(r).toEqual(true)
      done()
    })
  })
})
