import City from '../entities/City/City'
import { ICity } from '../../services/db/models/City'
import { TripModel } from '../../services/db/models/Trip'
import { IUser, UserModel } from '../../services/db/models/User'
import { Request, Response } from 'express'
import { ReqChecked } from '../../types/Express'
import { Driver } from '../../services/db/models/Driver'

async function id (req: Request, res: Response): Promise<Response> {
  const reqC = req as ReqChecked

  reqC.body.tripId = reqC.params.id

  const { routeNodes } = reqC.body
  const len = routeNodes.length
  if (len < 2) res.status(400).send('Error')

  reqC.body.fromCityId = reqC.body.routeNodes[0].cityId
  reqC.body.toCityId = reqC.body.routeNodes[len - 1].cityId
  reqC.body.date = new Date(reqC.body.datetime)
  reqC.body.passengers.avaiable = reqC.body.passengers.count

  // set route (Idem Preview, refactorizar)

  const nodes = reqC.body.routeNodes
  const ult = nodes.length - 1
  const nodeOrig = await City.create(nodes[0].cityId)
  const nodeDest = await City.create(nodes[ult].cityId)

  const nodesCopy = reqC.body.routeNodes.slice()
  nodesCopy.shift()
  nodesCopy.pop()

  const cityNodes = await Promise.all(
    nodesCopy.map(async (c: ICity): Promise<City> => await City.create(c.cityId)
    ))

  reqC.body.route = await nodeOrig.getRouteTo(nodeDest, cityNodes)

  // Get driver (refactorizar)

  const data = await UserModel.findById(reqC.userId) as IUser

  const driver: Driver = {
    id: reqC.userId,
    displayName: `${data.name} ${data.lastname}`,
    image: data.image,
    travels: data.travels,
    rating: data.rating,
    dniVerificated: data.dniVerificated
  }
  reqC.body.driver = driver
  reqC.body.passengers.available = reqC.body.passengers.count

  const newTrip = new TripModel(reqC.body)
  await newTrip.save()

  return res.status(201).end()
}

export default id
