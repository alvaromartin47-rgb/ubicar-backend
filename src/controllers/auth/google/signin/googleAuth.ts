import { Request, Response } from 'express'
import GoogleManager from '../../../entities/Google/GoogleManager'

async function googleAuth (_: Request, res: Response): Promise<void> {
  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
  const url = GoogleManager.getUrlLogin(scope)

  res.redirect(url)
}

export default googleAuth
