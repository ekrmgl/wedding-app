// lib/mongodb.js
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Development modunda global değişkeni kullan
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production modunda yeni client oluştur
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;