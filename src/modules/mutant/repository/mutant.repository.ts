import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { Dna } from '../schemas/dna.schema'
import { CreateDnaDto } from '../dto/create-dna.dto'

@Injectable()
export class MutantRepository {
  constructor(@InjectModel(Dna.name) private readonly dnaModel: Model<Dna>) {}

  async create(createDnaDto: CreateDnaDto) {
    const createdDna = new this.dnaModel(createDnaDto)
    const existsDna = await this.find(createdDna.dna)
    if (existsDna.length === 0) {
      createdDna.save()
    }
  }

  async find(dna: string): Promise<Dna[]> {
    return this.dnaModel.find({ dna: dna })
  }
}
