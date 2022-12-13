import { z } from 'zod'
import { Request, Response } from 'express'
import { ReqChecked } from '../../../types/Express'
import Reserve from '../../entities/Reservation/Reserve'

const reserveSchema = z.object({
  token: z.string(),
  issuer_id: z.string(),
  payment_method_id: z.string(),
  transaction_amount: z.number(),
  installments: z.number(),
  payer: z.object({
    email: z.string(),
    identification: z.object({
      type: z.string(),
      number: z.string()
    })
  })
}).strict()

async function reserve (req: Request, res: Response): Promise<Response> {
  reserveSchema.parse(req.body)
  const reqC = req as ReqChecked

  const travelerId = reqC.userId
  const tripId = reqC.params.tripId
  const paymentData = reqC.body

  paymentData.capture = false

  try {
    const reservation = await Reserve.create(
      tripId,
      travelerId,
      paymentData
    )
    return res.json({ status: reservation.getStatus() })
  } catch (err) {
    return (err instanceof Error)
      ? res.status(400).json({ error: err.message })
      : res.status(500).json({ error: 'Internal server error' })
  }
}

export default reserve
