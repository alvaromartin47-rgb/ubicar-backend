import mongoose from 'mongoose'

const DB_NAME = 'cards'
// const localUri = `mongodb://localhost:27017/${DB_NAME}`
const dockerUri = `mongodb://db/${DB_NAME}`

export default mongoose.connect(dockerUri)
  .then(_ => console.log('DB is connected'))
  .catch(err => console.log(err))
