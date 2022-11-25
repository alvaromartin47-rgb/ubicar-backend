import { Request, Response } from 'express'

export default async function check (req: Request, _: Response): Promise<void> {
  req.body.tripId = req.params.id

  // Calcular costo de servicio
}
