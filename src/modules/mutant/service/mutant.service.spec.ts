import { Test, TestingModule } from '@nestjs/testing'
import { MutantService } from './mutant.service'

describe('MutantService', () => {
  let service: MutantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutantService]
    }).compile()

    service = module.get<MutantService>(MutantService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
