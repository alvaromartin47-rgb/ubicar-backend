import Messages from '../Messages'
import Token from '../Token'
import Payment from '../Payment/Payment'
import Trip from '../Trip'
import { IReserve, ReserveModel } from '../../../services/db/models/Reserve'
import Driver from '../User/Driver/Driver'
import Traveller from '../User/Traveller/Traveller'
import { IPayment, IPaymentCreate } from '../../../services/db/models/Payment'
import Accept from './Accept'
import Create from './Create'

type ReserveUpdate = Pick<IReserve, 'status'> & {
  payment: Pick<IPayment, 'status' | 'status_detail' | 'fee_details'>
}

interface IReserveWithID extends IReserve {
  _id: string
}

export default class Reserve {
  private reservation: IReserveWithID
  private readonly driver: Driver
  private readonly traveller: Traveller

  constructor (reservation: IReserveWithID, traveller: Traveller, driver: Driver) {
    this.reservation = reservation
    this.driver = driver
    this.traveller = traveller
  }

  static async createWithId (reservationId: string): Promise<Reserve> {
    const data = await ReserveModel.findById(reservationId)
    if (!data) throw new Error('Reservation not found')

    const traveller = await Traveller.create(data.travelerId)
    const driver = await Driver.create(data.driverId)

    return new Reserve(data, traveller, driver)
  }

  static async create (tripId: string, travellerId: string, data: IPaymentCreate): Promise<Reserve> {
    const trip = await Trip.create(tripId)

    Reserve.travelerIsDriverOfTrip(trip, travellerId)
    await Reserve.travelerAlreadyBooked(tripId, travellerId)

    const paymentReservation = await Payment.reserve(data, travellerId)
    const driverId = trip.getDriverId()

    const traveller = await Traveller.create(travellerId)
    const driver = await Driver.create(driverId)

    const reservation = new Reserve(await Reserve.saveInDB(
      tripId, paymentReservation, driverId, travellerId
    ), traveller, driver)

    await reservation.generateToken()
    await reservation.notifyNewReservation()

    return reservation
  }

  async getTrip (): Promise<Trip> {
    return await Trip.create(this.reservation.tripId)
  }

  getStatus (): string {
    return this.reservation.payment.status_detail
  }

  getTraveller (): Traveller {
    return this.traveller
  }

  getDriver (): Driver {
    return this.driver
  }

  getAccessToken (): string {
    return this.reservation.access_token
  }

  async notifyNewReservation (): Promise<void> {
    await this.driver.notify(this, new Create())
    await this.traveller.notify(this, new Create())
  }

  // async notifyTravelerAccepted () {

  // }

  // async notifyTravelerCanceled () {

  // }

  async generateToken (): Promise<void> {
    this.reservation.access_token = Token.generate(
      {
        reservationId: this.reservation._id,
        userId: this.reservation.travelerId
      },
      process.env.TIME_DRIVER_ACCEPT_RESERVATION as string,
      process.env.PRIVATE_PWD_RESERVATION as string
    )

    await this.setAccessTokenInDB()
  }

  async setAccessTokenInDB (): Promise<void> {
    await ReserveModel.findByIdAndUpdate(this.reservation._id, {
      access_token: this.reservation.access_token
    })
  }

  async update (update: ReserveUpdate): Promise<void> {
    const updated = await ReserveModel.findByIdAndUpdate(
      this.reservation._id,
      update,
      { new: true }
    )

    if (!updated) throw new Error('Internal error')
    this.reservation = updated
  }

  static async saveInDB (tripId: string, payment: IPayment, driverId: string, travelerId: string): Promise<IReserveWithID> {
    const newReserve = new ReserveModel({
      tripId, payment, driverId, travelerId
    })

    return await newReserve.save()
  }

  static travelerIsDriverOfTrip (trip: Trip, travelerId: string): void {
    if (trip.isDriver(travelerId)) {
      throw new Error(Messages.ERROR_TRAVELER_IS_DRIVER())
    }
  }

  static async travelerAlreadyBooked (tripId: string, travelerId: string): Promise<void> {
    const thereIsReservation = await ReserveModel.findOne({
      tripId,
      travelerId
    })

    if (thereIsReservation) {
      throw new Error(Messages.ERROR_RESERVATION_ALREADY_EXISTS())
    }
  }

  wasAccepted (): void {
    if (this.reservation.status === 'accepted') {
      throw new Error(Messages.ERROR_RESERVATION_WAS_ALREADY_ACCEPT())
    }
  }

  tokenExists (): void {
    if (!this.reservation.access_token) throw new Error('Token not exists')
  }

  async accept (): Promise<Pick<IReserve, 'status'>> {
    this.wasAccepted()

    const payment = new Payment(this.reservation.payment)
    const captured = await payment.capture()

    await this.update({
      status: 'accepted',
      payment: {
        status: captured.status,
        status_detail: captured.status_detail,
        fee_details: captured.fee_details
      }
    })

    await this.traveller.notify(this, new Accept())

    return { status: this.reservation.payment.status_detail }
  }

  // async cancel () {
  //   this.tokenExists()

  //   try {
  //     Token.verify(this.accessToken, process.env.PRIVATE_PWD_RESERVATION)
  //   } catch (err) {
  //     const payment = new Payment(this.payment)
  //     const canceled = await payment.cancel()

  //     await this.update({
  //       status: 'canceled',
  //       payment: {
  //         status: canceled.status,
  //         status_detail: canceled.status_detail
  //       }
  //     })

  //     await this.notifyTravelerCanceled()

  //     return { status: this.status }
  //   }

  //   throw new Error(Messages.ERROR_TOKEN_IS_STILL_VALID())
  // }
}
