import mercadopago from 'mercadopago';
import TripSchema from '../../../services/db/models/TripSchema';

async function reserve(req, res) {
    const tripId = req.params.tripId;
    const isTrip = await TripSchema.findOne({tripId});

    if (!isTrip) res.status(404).send("El viaje no se encontró");
    
    req.body.capture = false;
    mercadopago.configurations.setAccessToken(
        process.env.MP_ACCESS_TOKEN
    );
    
    const data = (await mercadopago.payment.create(
        req.body
    )).response;

    const paymentObj = { payment: isTrip.payment };
    paymentObj.payment.push({
        id: data.id,
        status: data.status,
        status_detail: data.status_detail,
        payment_method_id: data.payment_method_id,
        payment_type_id: data.payment_type_id,
        description: data.description,
        payer: {
            userId: req.userId,
            first_name: data.payer.first_name,
            last_name: data.payer.last_name,
            email: data.payer.email,
            identification: data.payer.identification
        },
        transaction_amount: data.transaction_amount,
        fee_details: data.fee_details,
        card: data.card
    });

    await TripSchema.updateOne(
        {tripId},
        {
            payment: paymentObj.payment,
            passengers: {
                avaiable: isTrip.passengers.avaiable - 1
            }
        }
    )

    res.json({
        id: data.id,
        status: data.status,
        status_detail: data.status_detail
    });
}

export default reserve;