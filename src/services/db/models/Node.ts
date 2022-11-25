import { ICity } from './City'
import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class Node {
  @prop()
    city!: ICity

  @prop()
    distance!: number

  @prop()
    duration!: number

  @prop()
    datetime?: string
}
