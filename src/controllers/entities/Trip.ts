import TripSchema from '../../services/db/models/Trip'

export default class Trip {
  constructor (trip) {
    this.id = trip.tripId
    this.driverId = trip.driver.id

    const l = trip.route.nodes.length
    this.from = trip.route.nodes[0].city.name
    this.to = trip.route.nodes[l - 1].city.name
  }

  static async create (tripId) {
    const data = await TripSchema.findOne({ tripId })
    if (!data) throw new Error('Trip not found')

    return new Trip(data)
  }

  getFrom () {
    return this.from
  }

  getTo () {
    return this.to
  }

  getDriverId () {
    return this.driverId
  }

  isDriver (userId) {
    return userId === this.driverId
  }
}
