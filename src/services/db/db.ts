import mongoose from 'mongoose'

const username = process.env.MONGO_INITDB_ROOT_USERNAME
const password = process.env.MONGO_INITDB_ROOT_PASSWORD

// const localUri = `mongodb://localhost:27017/${DB_NAME}`
const dockerUri = 'mongodb://ubicar_db/ubicar?authSource=admin'

export default mongoose.connect(dockerUri,
  { user: username, pass: password })
  .then(_ => console.log('DB is connected'))
  .catch(err => console.log(err))
