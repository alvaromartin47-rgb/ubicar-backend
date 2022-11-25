import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class Rating {
  @prop({ default: 0 })
    quantity!: number

  @prop({ default: 0 })
    average!: number
}
