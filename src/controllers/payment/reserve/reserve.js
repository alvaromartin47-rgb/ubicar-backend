import mercadopago from 'mercadopago';
import TripSchema from '../../../services/db/models/TripSchema';

async function reserve(req, res) {
    mercadopago.configurations.setAccessToken(
        process.env.MP_ACCESS_TOKEN
    );

    req.body.capture = false;
    
    const data = (await mercadopago.payment.create(
        req.body
    )).response;
    
    // const paymentObj = { payment: {} };
    // paymentObj.payment[data.id] = {
    //     status: data.status,
    //     status_detail: data.status_detail,
    //     payment_method_id: data.payment_method_id,
    //     payment_type_id: data.payment_type_id,
    //     description: data.description,
    //     payer: data.payer,
    //     transaction_amount: data.transaction_amount,
    //     fee_details: data.fee_details,
    //     card: data.card
    // };

    // await TripSchema.findOneAndUpdate(
    //     { tripId: req.body.tripId },
    //     paymentObj
    // )

    res.json({
        id: data.id,
        status: data.status,
        status_detail: data.status_detail
    });
}

export default reserve;