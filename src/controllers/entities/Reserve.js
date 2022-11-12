import ReserveSchema from '../../services/db/models/ReserveSchema';
import UserSchema from '../../services/db/models/UserSchema';
import Messages from './Messages';
import User from './User';


export default class Reserve {

    static async create(trip, userId) {
        const {name, lastname} = await UserSchema.findById(userId);
        
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
        await user.notify({
            message: Messages.reserveTrip(
                `${name} ${lastname}`,
                from,
                to
            ),
            image: '' ,
            subject: '¡Tienes una nueva reserva!',
            html: '<h1>Tienes una nueva reserva</h1>'
        });

        return { status: reserve.status };
    }

}