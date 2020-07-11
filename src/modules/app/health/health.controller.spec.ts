/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthCheckService, DNSHealthIndicator } from '@nestjs/terminus'

describe('Health Controller', () => {
  let controller: HealthController
  let healthService: HealthCheckService
  let dns: DNSHealthIndicator

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthController,
        {
          provide: HealthCheckService,
          useValue: {}
        },
        {
          provide: DNSHealthIndicator,
          useValue: {}
        }
      ]
    }).compile()

    controller = module.get<HealthController>(HealthController)
    healthService = module.get<HealthCheckService>(HealthCheckService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
