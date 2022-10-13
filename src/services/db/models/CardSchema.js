import mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema({
    localTeam: {
        type: String
    },
    visitorTeam: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    image: {
        type: String
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('CardSchema', cardSchema);