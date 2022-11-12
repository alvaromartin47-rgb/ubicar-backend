import mongoose from 'mongoose';
import { replace_id } from './functions';

const { Schema } = mongoose;

const reserveSchema = new Schema({
    tripId: { type: String },
    driverId: { type: String },
    travelerId: { type: String },
    status: { type: String, default: "pending" }
}, { _id: false });

module.exports = mongoose.model('ReserveSchema', reserveSchema);