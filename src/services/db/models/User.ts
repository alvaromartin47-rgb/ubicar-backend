import { Notification } from './Notification'
import { Rating } from './Rating'
import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { _id: false },
  options: { allowMixed: 0 }
})
class Notifications {
  @prop({ default: 0 })
    quantity!: number

  @prop()
    notifications!: Notification[]
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

  @prop({ default: {} })
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

  @prop({ default: 0 })
  public travels?: number

  @prop({ default: {} })
  public rating?: Rating
}

export class IUserWithID extends IUser {
  _id!: string
}

export const UserModel = getModelForClass(IUser)
