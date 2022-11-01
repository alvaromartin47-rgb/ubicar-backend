import mercadopago from 'mercadopago';

async function cancel(req, res) {
    mercadopago.configurations.setAccessToken(
        process.env.MP_ACCESS_TOKEN
    );
    
    // Idem capture (refactorizar)
    // const trip = await TripSchema.findOne(req.tripId);

    // const paymentEntries = Object.entries(trip.payment);
    // const filtred = paymentEntries.filter(([key, value]) => {
    //     return value.status_detail === "pending_capture";
    // });
    // const [ paymentId ] = Object.fromEntries(filtred).keys();
    
    const data = (await mercadopago.payment.cancel(
        paymentId,
        mercadopago
    )).response;
    
    // const paymentObj = { payment: {} };
    // paymentObj.payment[data.id] = {
    //     status: data.status,
    //     status_detail: data.status_detail
    // };

    // await TripSchema.findOneAndUpdate(
    //     { tripId: req.body.tripId },
    //     paymentObj
    // );

    res.json({
        id: data.id,
        status: data.status,
        status_detail: data.status_detail
    });
}

export default cancel;