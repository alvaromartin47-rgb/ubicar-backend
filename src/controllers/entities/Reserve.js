import ReserveSchema from '../../services/db/models/ReserveSchema';
import UserSchema from '../../services/db/models/UserSchema';
import Messages from './Messages';
import User from './User';


export default class Reserve {

    constructor(reserve) {
        this.id = reserve.id;
        this.tripId = reserve.tripId;
        this.travelerId = reserve.travelerId;
        this.driverId = reserve.driverId;
        this.status = reserve.status;
    }

    static async create(trip, userId) {
        const { name, lastname } = await UserSchema.findById(userId);
        const isExistentReserve = await ReserveSchema.find({
            tripId: trip.tripId,
            travelerId: userId
        });

        if (isExistentReserve.length === 1) return { 
            "message": "A reservation already exists",
            "status_code": 400
        }
    
        const newReserve = new ReserveSchema({
            tripId: trip.tripId,
            driverId: trip.driver.id,
            travelerId: userId
        });

        const reserve = await newReserve.save();

        const l = trip.route.nodes.length;
        const from = trip.route.nodes[0].city.name;
        const to = trip.route.nodes[l - 1].city.name;

        const user = await User.create(trip.driver.id);
        const message = Messages.reserveTrip(
            `${name} ${lastname}`,
            from,
            to
        );

        await user.notify({
            message,
            image: '' ,
            subject: '¡Tienes una nueva reserva!',
            html: `<h4>${message}</h4>`
        });

        return { 
            id: reserve.id,
            status: reserve.status,
            status_code: 200
        };
    }

    static async instanceWith(reservationId) {
        try {
            const reserve = await ReserveSchema.findById(reservationId);
            if (!reserve) throw Error();
            return new Reserve(reserve);
        } catch(err) {
            throw new Error(Messages.ERROR_RESERVE_NOT_EXIST());
        }

    }

    canPay() {
        return this.status === "accepted";
    }

    async accept() {
        if (this.status == "accepted") {
            throw new Error(Messages.ERROR_RESERVATION_WAS_ALREADY_ACCEPT());
        }

        const update = { status: "accepted" };
        await ReserveSchema.findByIdAndUpdate(this.id, update);
        
        update.status_code = 200;
        return update;
    }

}