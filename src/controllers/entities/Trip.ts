import { ITrip, TripModel } from '../../services/db/models/Trip'

export default class Trip {
  private readonly trip: ITrip

  constructor (trip: ITrip) {
    this.trip = trip
  }

  static async create (tripId: string): Promise<Trip> {
    const data = await TripModel.findOne({ tripId })
    if (!data) throw new Error('Trip not found')

    return new Trip(data)
  }

  getData (): ITrip {
    return this.trip
  }

  getFrom (): string {
    return this.trip.route.nodes[0].city.name
  }

  getTo (): string {
    const l = this.trip.route.nodes.length - 1
    return this.trip.route.nodes[l].city.name
  }

  getDriverId (): string {
    return this.trip.driver.id
  }

  isDriver (userId: string): boolean {
    return userId === this.trip.driver.id
  }
}
