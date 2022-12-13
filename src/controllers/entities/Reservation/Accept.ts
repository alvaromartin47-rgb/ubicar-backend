import Emailer from '../Emailer'
import User from '../User/User'
// import Messages from '../Messages'
import { Notify } from './Notify'
import Reserve from './Reserve'
import { Notification } from '../../../services/db/models/Notification'

export default class Accept implements Notify {
  constructor () {}

  async notify (userNotificated: User, reservation: Reserve): Promise<Notification> {
    const trip = await reservation.getTrip()
    const driver = reservation.getTraveller()
    const traveller = reservation.getTraveller()

    const message = `¡Reserva confirmada! desde ${trip.getFrom()} a ${trip.getTo()}!
    \nConductor: ${driver.getFullname()}\nPasajero: ${traveller.getFullname()}`

    const notification = {
      message,
      image: '',
      subject: '¡Reserva confirmada!',
      html: `<h4>${message}</h4>`,
      address: userNotificated.getEmail()
    }

    const emailer = new Emailer(notification)
    await emailer.send()

    return notification
  }
}
