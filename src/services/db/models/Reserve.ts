import { IPayment } from './Payment'
import { prop, getModelForClass } from '@typegoose/typegoose'

export class IReserve {
  @prop()
    tripId!: string

  @prop()
    driverId!: string

  @prop()
    travelerId!: string

  @prop()
    status!: string

  @prop()
    access_token!: string

  @prop()
    payment!: IPayment
}

export const ReserveModel = getModelForClass(IReserve)
