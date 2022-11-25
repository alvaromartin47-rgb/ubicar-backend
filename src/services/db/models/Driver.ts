import { Rating } from './Rating'
import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export class Driver {
  @prop({ required: true })
    id!: string

  @prop({ required: true })
    displayName!: string

  @prop({ required: true })
    image!: string

  @prop({ required: true })
    travels?: number

  @prop({ required: true })
    rating?: Rating

  @prop({ required: true })
    dniVerificated?: boolean
}
