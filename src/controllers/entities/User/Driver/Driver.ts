import { IUserWithID, UserModel } from '../../../../services/db/models/User'
import User from '../User'
import Reserve from '../../Reservation/Reserve'
import { Notify } from '../../Reservation/Notify'

export default class Driver extends User {
  constructor (driver: IUserWithID) {
    super(driver)
  }

  static async create (userId: string): Promise<Driver> {
    const data = await UserModel.findById(userId)
    if (!data) throw new Error('User not found')

    return new Driver(data)
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
  }
}
