import mongoose from 'mongoose'
import NodePersist from 'node-persist'

const HOSTNAME = process.env.MONGO_HOSTNAME ? process.env.MONGO_HOSTNAME : 'localhost'
const DB_NAME = process.env.MONGO_DBNAME ? process.env.MONGO_DBNAME : 'project'
const CACHE_PATH = './cache'

export const cache = NodePersist.create({
  dir: CACHE_PATH,
})

class db {
  static async connect(): Promise<void> {
    const MONGO_STRING = process.env.MONGO_STRING || `mongodb://${HOSTNAME}:27017/${DB_NAME}`
    console.info('Setting up mongodb connection...')
    return await mongoose
      .connect(MONGO_STRING, {})
      .then((data) => {
        console.info('DB Connection set up')
        return Promise.resolve(data)
      })
      .catch((e) => {
        console.error(e)
        return e
      })
  }
}

export default db
