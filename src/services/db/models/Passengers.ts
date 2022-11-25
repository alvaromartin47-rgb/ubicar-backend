import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class Passengers {
  @prop({ default: 0 })
    quantity!: number

  @prop()
    smoking!: Boolean

  @prop()
    pets!: Boolean

  @prop()
    extraSpace!: string

  @prop()
    cost!: number

  @prop()
    available!: number
}
