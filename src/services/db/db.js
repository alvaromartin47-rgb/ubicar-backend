import mongoose from 'mongoose';

const DB_NAME = "cards";
const localUri = `mongodb://localhost:27017/${DB_NAME}`;
const dockerUri = `mongodb://db/${DB_NAME}`;

const db = mongoose.connect(dockerUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("DB is connected"))
    .catch(err => console.log(err));

module.exports = db;