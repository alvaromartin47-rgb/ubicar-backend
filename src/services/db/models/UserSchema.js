import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    googleCode: {
        type: String
    }
});

module.exports = mongoose.model('UserSchema', userSchema);