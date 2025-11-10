import { MongoClient } from "mongodb";

const url = process.env.DB_STRING!
const options = {}


let mongoClient: MongoClient
let ClientPromise: Promise<MongoClient> 

declare global{
    var _mongoClientPromise: Promise<MongoClient> 
}

if(process.env.NODE_ENV === 'development') {
    if(!global._mongoClientPromise) {
        mongoClient = new MongoClient(url, options)
        global._mongoClientPromise = mongoClient.connect()
    }
    ClientPromise = global._mongoClientPromise
} else {
    mongoClient = new MongoClient(url, options)
    ClientPromise = mongoClient.connect()
}

export default ClientPromise