import mongoose from 'mongoose';
import { replace_id } from './functions';

const { Schema } = mongoose;

const rating = new Schema({
    quantity: { type: Number, default: 0 },
    average: { type: Number, default: 0 }
}, { _id : false });

const userSchema = new Schema({
    name: { type: String },
    lastname: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: { type: String },
    googleCode: { type: String },
    aboutMe: { type: String },
    birthday: { type: String },
    dni: { type: Number },
    dniVerificated: { type: Boolean, default: false },
    mobileVerificated: { type: Boolean, default: false },
    mobile: { type: Number },
    travels: { type: Number, default: 0},
    rating: rating
}, {
    toJSON: {transform: replace_id}
});

module.exports = mongoose.model('UserSchema', userSchema);