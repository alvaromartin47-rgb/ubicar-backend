import { IUserWithID, UserModel } from '../../../../services/db/models/User'
import { Notify } from '../../Reservation/Notify'
import Reserve from '../../Reservation/Reserve'
import User from '../User'

export default class Common extends User {
  constructor (common: IUserWithID) {
    super(common)
  }

  static async create (userId: string): Promise<Common> {
    const data = await UserModel.findById(userId)
    if (!data) throw new Error('User not found')

    return new Common(data)
  }

  async notify (reservation: Reserve, notificationType: Notify): Promise<void> {
    console.log(reservation, notificationType)
  }
}
