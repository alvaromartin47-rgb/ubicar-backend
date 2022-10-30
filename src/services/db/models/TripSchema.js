import mongoose from 'mongoose';

const { Schema } = mongoose;

const routeNode = new Schema({
    cityId: { type: String }
}, { _id : false });

const passengers = new Schema({
    count: { type: Number },
    smoking: { type: Boolean },
    pets: { type: Boolean },
    extraSpace: { type: String }
}, { _id : false });

const tripSchema = new Schema({
    tripId: { type: String },
    datetime: { type: Number },
    date: { type: String },
    routeNodes: [ routeNode ],
    fromCityId: { type: String },
    toCityId: { type: String },
    transportId: { type: String },
    passengers: passengers,
    cost: { type: Number }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
    }
}});

module.exports = mongoose.model('TripSchema', tripSchema);