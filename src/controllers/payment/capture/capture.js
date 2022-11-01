import mercadopago from 'mercadopago';
import TripSchema from '../../../services/db/models/TripSchema';

async function capture(req, res) {
    mercadopago.configurations.setAccessToken(
        process.env.MP_ACCESS_TOKEN
    );
    
    // const trip = await TripSchema.findOne(req.tripId);
    
    // const paymentEntries = Object.entries(trip.payment);
    // const filtred = paymentEntries.filter(([key, value]) => {
    //     return value.status_detail === "pending_capture";
    // });
    // const [ paymentId ] = Object.fromEntries(filtred).keys();

    const paymentId = 1309044390;
    const data = (await mercadopago.payment.capture(
        paymentId,
        mercadopago
    )).response;

    // const paymentObj = { payment: {} };
    // paymentObj.payment[data.id] = {
    //     status: data.status,
    //     status_detail: data.status_detail,
    //     fee_details: data.fee_details
    // };

    // await TripSchema.findOneAndUpdate(
    //     { tripId: req.body.tripId },
    //     paymentObj
    // );

    res.json(data);
}

export default capture;