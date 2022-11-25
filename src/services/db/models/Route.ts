import { Node } from './Node'
import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { _id: false },
  options: { allowMixed: 0 }
})
export class Route {
  @prop()
    nodes!: Node[]

  @prop()
    distance!: number

  @prop()
    duration!: number

  @prop()
    iniDatetime?: string

  @prop()
    endDatetime?: string
}
