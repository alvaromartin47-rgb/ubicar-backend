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
    routeNodes: [ routeNode ],
    transportId: { type: String },
    passengers: passengers,
    cost: { type: Number }
});

module.exports = mongoose.model('TripSchema', tripSchema);