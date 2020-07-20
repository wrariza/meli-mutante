import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Dna extends Document {
  @Prop()
  dna: string

  @Prop()
  human: boolean

  @Prop()
  mutant: boolean
}

export const DnaShema = SchemaFactory.createForClass(Dna)
