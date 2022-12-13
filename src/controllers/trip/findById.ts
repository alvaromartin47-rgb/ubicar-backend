import { Request, Response } from 'express'
import { ReqChecked } from '../../types/Express'
import Trip from '../entities/Trip'

async function findById (req: Request, res: Response): Promise<Response> {
  const reqC = req as ReqChecked

  const { id } = reqC.params

  try {
    const user = await Trip.create(id)
    return res.json(user.getData())
  } catch (err) {
    return (err instanceof Error)
      ? res.status(400).json({ error: err.message })
      : res.status(500).json({ error: 'Internal server error' })
  }
}

export default findById
