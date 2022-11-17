import { Request, Response } from 'express'
import Token from '../../../../entities/Token'
import GoogleUser from '../../../../entities/Google/GoogleUser'
import GoogleManager from '../../../../entities/Google/GoogleManager'

async function googleAuthSuccess (req: Request, res: Response): Promise<void> {
  const { code } = req.query as { code: string }

  const googleManager = await GoogleManager.create(code)
  const profileData = await googleManager.getProfile()

  const userModel = { ...profileData, googleCode: code }

  const userId = await GoogleUser.saveInDB(userModel)

  const token = Token.generate({ userId }, '1h', process.env.PRIVATE_PWD as string)

  res.redirect(`${process.env.FRONTEND_URI}?token=${token}`)
}

export default googleAuthSuccess
