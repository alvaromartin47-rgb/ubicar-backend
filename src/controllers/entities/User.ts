import { IUser, UserModel } from '../../services/db/models/User'
import INotification from '../../services/db/models/Notification'
import Emailer from '../entities/Emailer'

class IUserWithID extends IUser {
  _id!: string
}

export default class User extends IUserWithID {
  constructor (data: IUserWithID) {
    super()

    this.name = data.name
    this.lastname = data.lastname
    this._id = data._id
    this.email = data.email
    this.notifications = data.notifications
  }

  static async create (userId: string): Promise<User> {
    const data = await UserModel.findById(userId)
    if (!data) throw new Error('User not found')

    return new User(data)
  }

  getFullname (): string {
    return `${this.name} ${this.lastname}`
  }

  async notify (notification: INotification): Promise<void> {
    const update = this.notifications
    if (!update) return

    update.quantity += 1
    update.notifications.push(notification)

    const emailer = new Emailer(notification)

    await emailer.send()

    await UserModel.findByIdAndUpdate(this._id, {
      notifications: update
    })
  }
}
