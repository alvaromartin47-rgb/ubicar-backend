import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'
import { replaceId } from './functions'

@modelOptions({ schemaOptions: { _id: false } })
class Notification {
  @prop()
    message!: string

  @prop()
    image!: string

  @prop()
    access_token!: string
}

@modelOptions({ schemaOptions: { _id: false } })
class Notifications {
  @prop({ default: 0 })
    quantity!: number

  @prop({ type: () => [Notification] })
    notifications!: Notification[]
}

@modelOptions({ schemaOptions: { _id: false } })
class Rating {
  @prop({ default: 0 })
    quantity!: number

  @prop({ default: 0 })
    average!: number
}

@modelOptions({ schemaOptions: { toJSON: { transform: replaceId } } })
export class User {
  @prop({ required: true, unique: true })
  public email!: string

  @prop()
  public name!: string

  @prop()
  public lastname!: string

  @prop()
  public image!: string

  @prop()
  public googleCode!: string

  @prop({ type: () => Notifications, default: {} })
  public notifications?: Notifications

  @prop()
  public aboutMe?: string

  @prop()
  public birthday?: string

  @prop()
  public dni?: number

  @prop({ default: false })
  public dniVerificated?: boolean

  @prop({ default: false })
  public mobileVerificated?: boolean

  @prop()
  public mobile?: number

  @prop()
  public travels?: number

  @prop({ type: () => Rating, default: {} })
  public rating?: Rating
}

export const UserModel = getModelForClass(User)
