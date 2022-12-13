import Common from './Common/Common'
import {
  IUserWithID,
  UserModel,
  IUser
} from '../../../services/db/models/User'
import Reserve from '../Reservation/Reserve'
import { Notify } from '../Reservation/Notify'

type UpdateProfile = Partial<Omit<IUser, 'email'>>

export default abstract class User {
  protected readonly user: IUserWithID

  constructor (user: IUserWithID) {
    this.user = user
  }

  static async create (userId: string): Promise<User> {
    const data = await UserModel.findById(userId)
    if (!data) throw new Error('User not found')

    return new Common(data)
  }

  getFullname (): string {
    return `${this.user.name} ${this.user.lastname}`
  }

  getEmail (): string {
    return this.user.email
  }

  static async update (id: string, body: UpdateProfile): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, body)
    } catch (error) {
      throw new Error('User not found')
    }
  }

  abstract notify (reservation: Reserve, notificationType: Notify): Promise<void>
}
