import { getModelForClass, prop } from '@typegoose/typegoose'
import { Route } from './Route'
import { Driver } from './Driver'
import { Passengers } from './Passengers'

export class ITrip {
  @prop({ required: true })
    tripId!: string

  @prop()
    datetime!: number

  @prop()
    date!: number

  @prop()
    route!: Route

  @prop()
    driver!: Driver

  @prop()
    fromCityId!: string

  @prop()
    toCityId!: string

  @prop()
    transportId!: string

  @prop()
    passengers!: Passengers
}

export const TripModel = getModelForClass(ITrip)
