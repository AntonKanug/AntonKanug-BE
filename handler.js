"use strict";

require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;
const connectDB = async () => {
  const uri = process.env.MONGO_DB_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true });

  await client.connect();
  return client.db("PriceWatch").collection("PriceWatch-Products");
};


module.exports.hello = async (event) => {
  const collection = await connectDB();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
        products: await collection.find({}, "title").toArray(),
      },
      null,
      2
    ),
  };
};


module.exports.world = async (event) => {
  const collection = await connectDB();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World",
        input: event,
        products: await collection.find({}).toArray(),
      },
      null,
      2
    ),
  };
};
