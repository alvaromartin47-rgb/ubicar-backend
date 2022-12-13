import mercadopago from 'mercadopago'
import { IPayment, IPaymentCreate } from '../../../services/db/models/Payment'
import { ReserveModel } from '../../../services/db/models/Reserve'

export default class Payment {
  private readonly mercadopago: any
  private readonly payment: IPayment

  constructor (payment: IPayment) {
    this.mercadopago = mercadopago
    this.mercadopago.configurations.setAccessToken(
      process.env.MP_ACCESS_TOKEN
    )

    this.payment = payment
  }

  static async create (reservationId: string): Promise<Payment> {
    const data = await ReserveModel.findById(reservationId)
    if (!data) throw new Error('Payment not found')

    return new Payment(data.payment)
  }

  static async reserve (paymentData: IPaymentCreate, userId: string): Promise<IPayment> {
    mercadopago.configurations.setAccessToken(
      process.env.MP_ACCESS_TOKEN as string
    )

    const data = (await mercadopago.payment.create(
      paymentData
    )).response

    return {
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
      payment_method_id: data.payment_method_id,
      payment_type_id: data.payment_type_id,
      description: data.description,
      payer: {
        userId,
        first_name: data.payer.first_name,
        last_name: data.payer.last_name,
        email: data.payer.email,
        identification: data.payer.identification
      },
      transaction_amount: data.transaction_amount,
      fee_details: data.fee_details,
      card: data.card
    }
  }

  // async cancel () {
  //   const data = (await this.mercadopago.payment.cancel(
  //     this.id,
  //     this.mercadopago
  //   )).response

  //   return data
  // }

  async capture (): Promise<IPayment> {
    const data = (await this.mercadopago.payment.capture(
      this.payment.id,
      this.mercadopago
    )).response

    return data
  }
}
