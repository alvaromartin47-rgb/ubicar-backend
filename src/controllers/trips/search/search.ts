import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'
import { TripModel } from '../../../services/db/models/Trip'
import { ReqChecked } from '../../../types/Express'

function getRelativeEpoch (epochUTC: number, diference: number): number {
  let epochUTCCopy = epochUTC
  epochUTCCopy = epochUTCCopy - (3600 * 1000 * diference)

  return epochUTCCopy
}

interface BodyEpochRange {
  epochInf: number
  epochSup: number
}

function getEpochRange (date: string, difEpochZone: number): BodyEpochRange {
  const parse = date.split('-')
  const month = parse[1].split('')[0] === '0'
    ? parse[1].split('')[1]
    : parse[1]

  let epochInf = Date.UTC(
    parseInt(parse[0]),
    parseInt(month) - 1,
    parseInt(parse[2])
  )

  epochInf = getRelativeEpoch(epochInf, difEpochZone)

  const epochSup = epochInf + (86400 * 1000)

  return { epochInf, epochSup }
}

export default async function search (req: Request, res: Response): Promise<Response> {
  const reqC = req as ReqChecked

  const filtredEntryBody = Object.entries(reqC.body)
    .filter(([_, value]) => !!value)
  const filtredBody = Object.fromEntries(filtredEntryBody)

  // Filter per timezone
  let datetime
  const difEpochZone = -3

  if (filtredBody.datetime) {
    const { epochInf, epochSup } = getEpochRange(
      filtredBody.datetime as string,
      difEpochZone
    )

    datetime = { $gte: epochInf, $lte: epochSup }
    delete filtredBody.datetime
  }

  // Generate filter orderBy
  const orderAsc = filtredBody.orderAsc as boolean
  const orderBy = filtredBody.orderBy as string
  const objSort: { [key: string]: SortOrder } = {}
  if (orderAsc && orderBy) objSort[orderBy] = 1
  else if (orderBy) objSort[orderBy] = -1

  let passengers
  if (filtredBody.passengers) {
    passengers = { count: passengers }
    delete filtredBody.passengers
  }

  const trips = await TripModel.find({
    ...filtredBody,
    datetime,
    passengers
  })
    .sort(objSort)
    .skip(filtredBody.skip as number || 0)
    .limit(filtredBody.limit as number || 15)

  return res.json({
    trips,
    skip: filtredBody.skip || 0,
    limit: filtredBody.limit || 15,
    total: trips.length
  })
}
