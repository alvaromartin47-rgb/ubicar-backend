import INotification from './Notification'
import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { _id: false } })
class Notifications {
  @prop({ required: true, default: 0 })
    quantity!: number

  @prop({ type: () => [INotification] })
    notifications!: INotification[]
}

@modelOptions({ schemaOptions: { _id: false } })
class Rating {
  @prop({ default: 0 })
    quantity!: number

  @prop({ default: 0 })
    average!: number
}

export class IUser {
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

export class IUserWithID extends IUser {
  _id!: string
}

export const UserModel = getModelForClass(IUser)
