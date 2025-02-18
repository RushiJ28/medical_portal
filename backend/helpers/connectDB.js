const { MongoClient } = require("mongodb");

//To connect to the Database
const uri = "mongodb://localhost:27017";
//Database name
const dbName = "MedicalPortal";

let db = null;
const client = new MongoClient(uri);

async function getDatabase() {
  try {
    //Connect to the MongoDB server
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.log(err);
    throw new Error(error);
  }
}

module.exports = { getDatabase, client };
