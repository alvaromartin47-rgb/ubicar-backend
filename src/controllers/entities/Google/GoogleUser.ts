import { User, UserModel } from '../../../services/db/models/User'
import { GoogleProfile } from './types'

export default class GoogleUser {
  userId?: string
  email: string

  // Provisorio (corregir)
  constructor (body: GoogleProfile & { userId?: string }) {
    this.userId = body.userId
    this.email = body.email
  }

  static async create (email: string): Promise<GoogleUser> {
    const data = await UserModel
      .findOne({ email }) as GoogleProfile

    if (!data) throw new Error('GoogleUser not found')

    return new GoogleUser(data)
  }

  static async saveInDB (user: User): Promise<string> {
    if (!user.email) {
      throw new Error('Email is required')
    }

    let data = await UserModel
      .findOne({ email: user.email })

    if (data) {
      await UserModel.findByIdAndUpdate(data.id, user)
    } else {
      const newUser = new UserModel(user)
      data = await newUser.save()
    }

    return data.id
  }

  get (): void {

  }
}
