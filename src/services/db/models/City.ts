import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class ICity {
  @prop()
    cityId!: string

  @prop()
    name!: string

  @prop()
    lat!: number

  @prop()
    lon!: number
}
