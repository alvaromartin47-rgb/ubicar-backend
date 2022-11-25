import { z } from 'zod'
import { Request, Response } from 'express'
import City from '../../../entities/City/City'
import { ReqChecked } from '../../../../types/Express'
import ICity from '../../../entities/City/interfaces/ICity'

const updateProfileSchema = z.object({
  datetime: z.string().min(1).max(50),
  nodes: z.array(z.object({
    cityId: z.string().min(1).max(50),
    name: z.string().min(1).max(50),
    lat: z.number(),
    lon: z.number()
  })).min(2)
}).strict()

async function preview (req: Request, res: Response): Promise<Response> {
  try {
    updateProfileSchema.parse(req.body)
    const reqC = req as ReqChecked

    const { nodes } = reqC.body

    const ult = nodes.length - 1
    const nodeOrig = await City.create(nodes[0].cityId)
    const nodeDest = await City.create(nodes[ult].cityId)

    const nodesCopy = nodes.slice()
    nodesCopy.shift()
    nodesCopy.pop()

    const cityNodes = await Promise.all(
      nodesCopy.map(async (c: ICity) => await City.create(c.cityId)))

    return res.json(await nodeOrig.getRouteTo(nodeDest, cityNodes))
  } catch (err) {
    return (err instanceof z.ZodError) || (err instanceof Error)
      ? res.status(400).json(err)
      : res.status(500).json({ error: 'Internal server error' })
  }
}

export default preview
