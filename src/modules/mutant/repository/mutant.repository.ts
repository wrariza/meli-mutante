import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { Dna } from '../schemas/dna.schema'
import { CreateDnaDto } from '../dto/create-dna.dto'

import { Stats } from '../../../domain/models/stats/Stats.model'

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

  async stats(): Promise<Stats> {
    const mutant = await this.dnaModel.find({ mutant: true }).count()
    const human = await this.dnaModel.find({ human: true }).count()
    const ratio = human !== 0 ? mutant / human : 0

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      count_mutant_dna: mutant,
      // eslint-disable-next-line @typescript-eslint/camelcase
      count_human_dna: human,
      ratio: ratio
    }
  }
}
