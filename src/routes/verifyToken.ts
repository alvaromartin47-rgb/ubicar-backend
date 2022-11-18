import { NextFunction, Request, Response } from 'express'
import Token from '../controllers/entities/Token'
import User from '../controllers/entities/User'
import { ReqChecked } from '../types/Express'

const verifyToken = async (
  req: Request, res: Response, next: NextFunction
): Promise<any> => {
  const reqC = req as ReqChecked

  const token = reqC.headers.authorization.split(' ')[1]

  try {
    const { userId } = Token.verify(
      token,
      process.env.PRIVATE_PWD as string
    ) as { userId: string }

    reqC.userId = userId
    await User.create(userId)

    next()
  } catch ({ message }) {
    if (message === 'User not found') return res.json({ message })
    res.redirect(`${process.env.BACKEND_URI}/api/auth/google/signin`)
  }
}

export default verifyToken
