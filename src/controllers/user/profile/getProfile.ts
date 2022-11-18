import { Request, Response } from 'express'
import { UserModel } from '../../../services/db/models/User'
import { ReqChecked } from '../../../types/Express'

async function getProfile (req: Request, res: Response): Promise<void> {
  const reqC = req as ReqChecked

  const userId = reqC.userId

  res.json(
    await UserModel.findById(
      userId,
      { googleCode: 0 }
    )
  )
}

export default getProfile
