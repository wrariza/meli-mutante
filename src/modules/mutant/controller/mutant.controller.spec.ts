import { Test, TestingModule } from '@nestjs/testing'
import { MutantController } from './mutant.controller'

describe('Mutant Controller', () => {
  let controller: MutantController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutantController]
    }).compile()

    controller = module.get<MutantController>(MutantController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
