import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

class FeeDetails {
  @prop()
    type?: string

  @prop()
    amount?: number

  @prop()
    fee_payer?: string
}

class Identification {
  @prop()
    number!: string

  @prop()
    type!: string
}

class Cardholder {
  @prop()
    name!: string

  @prop()
    identification!: Identification
}

class Card {
  @prop()
    first_six_digits!: string

  @prop()
    last_four_digits!: string

  @prop()
    expiration_month!: number

  @prop()
    expiration_year!: number

  @prop()
    date_created!: string

  @prop()
    date_last_updated!: string

  @prop()
    cardholder!: Cardholder
}

@modelOptions({ schemaOptions: { _id: false } })
class Payer {
  @prop()
    userId!: string

  @prop()
    first_name!: string

  @prop()
    last_name!: string

  @prop()
    email!: string

  @prop()
    identification!: Identification
}

@modelOptions({ schemaOptions: { _id: false }, options: { allowMixed: 0 } })
export class IPayment {
  @prop()
    id!: string

  @prop()
    status!: string

  @prop()
    status_detail!: string

  @prop()
    payment_method_id!: string

  @prop()
    payment_type_id!: string

  @prop()
    description!: string

  @prop()
    payer!: Payer

  @prop()
    transaction_amount!: number

  @prop()
    fee_details!: [FeeDetails]

  @prop()
    card!: Card
}

export interface IPaymentCreate {
  capture: boolean
  installments: number
  payer: Omit<Payer, 'userId'>
  payment_method_id: string
  transaction_amount: number
  token: string
  issuer_id: string
}

export const PaymentModel = getModelForClass(IPayment)
