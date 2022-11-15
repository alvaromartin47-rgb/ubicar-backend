import Messages from './Messages';
import User from './User';
import Token from './Token';
import Payment from './Payment';
import Trip from './Trip';
import ReserveSchema from '../../services/db/models/ReserveSchema';

export default class Reserve {

    constructor(reserve) {
        this.id = reserve.id;
        this.tripId = reserve.tripId;
        this.travelerId = reserve.travelerId;
        this.driverId = reserve.driverId;
        this.status = reserve.status;
        this.payment = reserve.payment;
        this.accessToken = reserve?.access_token;
    }

    static async createWithId(reservationId) {
        const data = await ReserveSchema.findById(reservationId);
        if (!data) {
            throw new Error('Reservation not found');
        }

        return new Reserve(data);
    }

    static async create(tripId, travelerId, paymentData) {
        const trip = await Trip.create(tripId);

        Reserve.travelerIsDriverOfTrip(trip, travelerId);
        await Reserve.travelerAlreadyBooked(tripId, travelerId);

        const paymentReservation = await Payment.reserve(paymentData);
        const driverId = trip.getDriverId();

        const reservation = new Reserve(await Reserve.saveInDB(
            tripId, paymentReservation, driverId, travelerId
        ));

        await reservation.generateToken();
        await reservation.notifyDriverCreated();

        return reservation;
    }

    status() {
        return this.status;
    }
    
    async notifyDriverCreated() {
        const trip = await Trip.create(this.tripId);

        const driver = await User.create(this.driverId);
        const traveler = await User.create(travelerId);

        const message = Messages.reserveTrip(
            traveler.getFullname(), trip.from(), trip.to()
        );

        await driver.notify({
            message,
            image: '',
            subject: '¡Tienes una nueva reserva!',
            html: `<h4>${message}</h4>`,
            access_token: this.accessToken
        });
    }

    async notifyTravelerAccepted() {

    }

    async notifyTravelerCanceled() {

    }

    async generateToken() {
        this.accessToken = Token.generate(
            { reservationId: this.id, userId: this.userId },
            process.env.TIME_DRIVER_ACCEPT_RESERVATION,
            process.env.PRIVATE_PWD_RESERVATION
        );

        await this.setAccessTokenInDB();
    }

    async setAccessTokenInDB() {
        await ReserveSchema.findByIdAndUpdate(this.id, {
            access_token: this.accessToken
        });
    }

    async update(update) {
        this.payment = (await ReserveSchema.findByIdAndUpdate(
            this.id,
            update,
            {new: true}
        )).payment;

        this.status = update.status;
    }

    static async saveInDB(tripId, payment, driverId, travelerId) {
        const newReserve = new ReserveSchema({
            tripId, payment, driverId, travelerId
        });

        return await newReserve.save();
    }

    static travelerIsDriverOfTrip(trip, travelerId) {
        if (trip.isDriver(travelerId)) {
            throw new Error(Messages.ERROR_TRAVELER_IS_DRIVER);
        }
    }

    static async travelerAlreadyBooked(tripId, travelerId) {
        const thereIsReservation = await ReserveSchema.findOne({
            tripId,
            travelerId
        });

        if (thereIsReservation) {
            throw new Error(Messages.ERROR_RESERVATION_ALREADY_EXISTS);
        }
    }

    wasAccepted() {
        if (this.status == "accepted") {
            throw new Error(Messages.ERROR_RESERVATION_WAS_ALREADY_ACCEPT());
        }
    }

    tokenExists() {
        if (!this.accessToken) throw new Error("Token not exists");
    }

    async accept() {
        this.tokenExists();

        try {
            Token.verify(this.accessToken);
        } catch(err) {
            throw new Error(Messages.ERROR_RESERVATION_TOKEN_EXPIRED_OR_INVALID)
        }

        this.wasAccepted();

        const payment = new Payment(this.payment);
        const captured = await payment.capture();

        await this.update({status: "accepted",
            payment: {
                status: captured.status,
                status_detail: captured.status_detail,
                fee_details: captured.fee_details,
        }});

        await this.notifyTravelerAccepted();

        return {status: this.status};
    }

    async cancel() {
        this.tokenExists();

        try {
            Token.verify(this.accessToken);
        } catch(err) {
            const payment = new Payment(this.payment);
            const canceled = await payment.cancel();
    
            await this.update({status: "canceled",
                payment: {
                    status: canceled.status,
                    status_detail:
                    canceled.status_detail
            }});
            
            await this.notifyTravelerCanceled();
            
            return {status: this.status};
        }
    
        throw new Error(Messages.ERROR_TOKEN_IS_STILL_VALID);
    }

}