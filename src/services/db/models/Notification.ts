import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
export default class Notification {
  @prop()
    message!: string

  @prop()
    access_token!: string

  @prop()
    subject!: string

  @prop()
    address!: string

  @prop()
    image?: string

  @prop()
    html?: string
}
