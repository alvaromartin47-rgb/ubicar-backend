import mongoose from 'mongoose';
import { replace_id } from './functions';

const { Schema } = mongoose;

const identification = new Schema({
    number: { type: String },
    type: { type: String }
}, { _id : false });

const cardholder = new Schema({
    name: { type: String },
    identification: identification
}, { _id : false });

const card = new Schema({
    first_six_digits: { type: String },
    last_four_digits: { type: String },
    expiration_month: { type: Number },
    expiration_year: { type: Number },
    date_created: { type: String },
    date_last_updated: { type: String },
    cardholder: cardholder
}, { _id : false });

const fee_details = new Schema({
    type: { type: String },
    amount: { type: Number },
    fee_payer: { type: String }
}, { _id : false });

const payer = new Schema({
    userId: { type: String },
    first_name: { type: String },
	last_name: { type: String },
	email: { type: String },
	identification: identification,
    id: { type: String }
}, { _id : false });

const payment = new Schema({
    id: { type: String },
    status: { type: String },
    status_detail: { type: String },
    payment_method_id: { type: String },
    payment_type_id: { type: String },
    description: { type: String },
    payer: payer,
    transaction_amount: { type: Number },
    fee_details: [fee_details],
    card: card
}, { _id : false });

const reserveSchema = new Schema({
    tripId: { type: String },
    driverId: { type: String },
    travelerId: { type: String },
    status: { type: String, default: "pending" },
    access_token: { type: String },
    payment: [payment]
}, {
    toJSON: {transform: replace_id}
});

module.exports = mongoose.model('ReserveSchema', reserveSchema);