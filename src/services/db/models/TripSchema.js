import mongoose from 'mongoose';

const { Schema } = mongoose;

const rating = new Schema({
    quantity: { type: Number },
    average: { type: Number }
});

const driver = new Schema({
    displayName: { type: String },
    image: { type: String },
    travels: { type: Number },
    rating: rating,
    verification: { type: Boolean }
});

const city = new Schema({
    id: { type: String },
    name: { type: String },
    lat: { type: Number },
    lon: { type: Number }
}, { _id : false });

const node = new Schema({
    city: city,
    duration: { type: Number },
    distance: { type: Number }
}, { _id : false });

const route = new Schema({
    nodes: [ node ],
    datetime: { type: String }
}, { _id : false });

const passengers = new Schema({
    count: { type: Number },
    smoking: { type: Boolean },
    pets: { type: Boolean },
    extraSpace: { type: String },
    cost: { type: Number }
}, { _id : false });

const tripSchema = new Schema({
    tripId: { type: String },
    datetime: { type: Number },
    date: { type: String },
    route: route,
    driver: driver,
    fromCityId: { type: String },
    toCityId: { type: String },
    transportId: { type: String },
    passengers: passengers
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
    }
}});

module.exports = mongoose.model('TripSchema', tripSchema);