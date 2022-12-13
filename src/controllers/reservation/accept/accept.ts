import { Request, Response } from 'express'
import { ReqChecked } from '../../../types/Express'
import Reserve from '../../entities/Reservation/Reserve'
import Token from '../../entities/Token'

async function accept (req: Request, res: Response): Promise<Response> {
  const reqC = req as ReqChecked

  const { access_token } = reqC.body

  try {
    const { reservationId } = Token.verify(
      access_token,
      process.env.PRIVATE_PWD_RESERVATION as string
    ) as { reservationId: string }

    const reservation = await Reserve.createWithId(reservationId)
    return res.json(await reservation.accept())
  } catch (err) {
    return (err instanceof Error)
      ? res.status(400).json({ error: err.message })
      : res.status(500).json({ error: 'Internal server error' })
  }
}

export default accept
