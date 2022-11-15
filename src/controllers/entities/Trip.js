import TripSchema from '../../services/db/models/TripSchema';

export default class Trip {

    constructor(trip) {
        this.id = trip.tripId;
        this.driverId = trip.driver.id;

        const l = trip.route.nodes.length;
        this.from = trip.route.nodes[0].city.name;
        this.to = trip.route.nodes[l - 1].city.name;
    }

    static async create(tripId) {
        const data = await TripSchema.findById(tripId);
        if (!data) throw new Error('Trip not found');

        return new Trip(data);
    }

    from() {
        return this.from;
    }

    to() {
        return this.to;
    }

    getDriverId() {
        return this.driverId;
    }

    isDriver(userId) {
        return userId === this.driver;
    }

}