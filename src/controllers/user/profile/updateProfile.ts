import { z } from 'zod'
import { Request, Response } from 'express'
import User from '../../entities/User'
import { ReqChecked } from '../../../types/Express'

const updateProfileSchema = z.object({
  name: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50)
}).strict()

async function updateProfile (req: Request, res: Response): Promise<Response | undefined> {
  try {
    updateProfileSchema.parse(req.body)
    const reqC = req as ReqChecked

    await User.update(reqC.userId, req.body)
  } catch (err) {
    return (err instanceof z.ZodError) || (err instanceof Error)
      ? res.status(400).json(err)
      : res.status(500).json({ error: 'Internal server error' })
  }

  return res.status(201).end()
}

export default updateProfile
