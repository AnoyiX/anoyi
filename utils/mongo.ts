import { MongoClient } from 'mongodb'

let uri = process.env.MONGO_URI

let mongo: MongoClient | null = null

if (!uri) throw new Error('Missing environment variable MONGO_URI')

export async function connect() {
  if (mongo) return mongo
  mongo = await MongoClient.connect(uri as string)
  return mongo
}