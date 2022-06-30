import { MongoClient } from 'mongodb'

let client = new MongoClient(process.env.MONGODB_URI, {})
let MongoPromise = client.connect()

export default MongoPromise