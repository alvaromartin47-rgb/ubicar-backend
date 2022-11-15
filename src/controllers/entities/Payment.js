import mercadopago from "mercadopago";

export default class Payment {

    static async reserve(paymentData) {
        paymentData.capture = false;
        mercadopago.configurations.setAccessToken(
            process.env.MP_ACCESS_TOKEN
        );
        
        const data = (await mercadopago.payment.create(
            paymentData
        )).response;
    
        return {
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
        };
    }
}