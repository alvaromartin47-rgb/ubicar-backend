import mongoose from 'mongoose';

const { Schema } = mongoose;

const transportSchema = new Schema({
    transportId: { type: String },
    userId: { type: String },
    name: { type: String },
    type: { type: String },
    patent: { type: String },
    ownerFullName: { type: String },
    ownerDNI: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    gas: { type: String },
    insuranceType: { type: String },
    lastVTV: { type: Number },
    airConditioning: { type: Boolean },
    sealBelt: { type: Boolean },
    airbag: { type: Boolean }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
    }
}});

module.exports = mongoose.model('TransportSchema', transportSchema);