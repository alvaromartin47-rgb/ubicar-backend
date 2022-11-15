import mercadopago from "mercadopago";
import ReserveSchema from '../../services/db/models/ReserveSchema';

export default class Payment {

    constructor(payment) {
        this.mercadopago = mercadopago;
        this.mercadopago.configurations.setAccessToken(
            process.env.MP_ACCESS_TOKEN
        );

        this.id = payment.id;
    }

    static async create(reservationId) {
        const data = await ReserveSchema.findById(reservationId);
        if (!data) {
            throw new Error('Payment not found');
        }

        return new Payment(data.payment);
    }

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

    static async cancel() {
        const data = (await this.mercadopago.payment.cancel(
            this.id,
            this.mercadopago
        )).response;

        return data;
    }

}