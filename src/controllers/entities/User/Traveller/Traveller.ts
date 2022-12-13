import { IUserWithID, UserModel } from '../../../../services/db/models/User'
import User from '../User'
// import Messages from '../../Messages'
import Reserve from '../../Reservation/Reserve'
import { Notify } from '../../Reservation/Notify'

export default class Traveller extends User {
  constructor (traveller: IUserWithID) {
    super(traveller)
  }

  static async create (travellerId: string): Promise<Traveller> {
    const data = await UserModel.findById(travellerId)
    if (!data) throw new Error('User not found')

    return new Traveller(data)
  }

  async notify (reservation: Reserve, notificationType: Notify): Promise<void> {
    const notification = await notificationType.notify(this, reservation)

    const update = this.user.notifications
    if (!update) return

    update.quantity += 1
    update.notifications.push(notification)

    await UserModel.findByIdAndUpdate(this.user._id, {
      notifications: update
    })

    await notificationType.notify(this, reservation)
  }
}
