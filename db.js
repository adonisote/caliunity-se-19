import { MongoClient } from 'mongodb';

let dbConnection;
let uri = 'mongodb+srv://adonisalmagro:FCh1mvYjXrbjve0m@cluster0.5u8kryv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToDb = (cb) => {
  // Return a promise-based MongoClient connection
  MongoClient.connect(uri)
    .then((client) => {
      dbConnection = client.db();// Assign the database connection
      return cb(); // Call the callback indicating success
    })
    .catch((err) => {
      console.log(err);
      return cb(err); // Call the callback with the error

    })

};

const getDb = () => dbConnection;

export { connectToDb, getDb };
