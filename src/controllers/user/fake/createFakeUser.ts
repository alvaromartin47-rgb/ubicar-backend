import Token from '../../entities/Token'
import { UserModel } from '../../../services/db/models/User'
import { Request, Response } from 'express'

async function createFakeUser (req: Request, res: Response): Promise<Response | undefined> {
  const newUser = new UserModel(req.body)
  const { id } = await newUser.save()

  const accessToken = Token.generate(
    { userId: id },
    '10m',
    process.env.PRIVATE_PWD as string
  )

  return res.json({ accessToken })
}

export default createFakeUser
