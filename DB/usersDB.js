import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.CLUSTER_URI;

const client = new MongoClient(`mongodb+srv://${userName}:${password}${cluster}`);

async function run() {
  try {
    // Connect to your cluster
    await client.connect();
    
    // Access your database and collection
    const db = client.db('ToDoDB');
    const collection = db.collection('users');
    return collection;
  } catch (err) {
    throw new Error('An error occurred: ' + err);
  }
}


const getInsertUsersDB = async () => {
  try {
    const collection = await run();
    // Insert data directly
    const result = await collection.insertMany([
      { userName: "abcd", password: "efgh" },
    ]);

    console.log(`${result.insertedCount} documents inserted.`);
  } catch (e) {
    throw new Error(e.message);
  } finally {
    await client.close();
  }
}

const getSelectUsersDB = async (userName, password) => {
  //userName = "abcd"
  //password = "efgh"
  try {
    const collection = await run();
    const query = {
      name: {
        username: userName,
        password: password,
      }
    };
    const result = await collection.find(query);

    // Use toArray to convert the cursor to an array for easier processing
    const documents = await result.toArray();

    if (documents.length === 0) {
      console.log("Email or password is incorrect.");
      return null;
    } else {
      return documents.map(document => ({
        name: document.name,
        value: document.value
      }));
    }
  } catch (err) {
    throw new Error('An error occurred: ' + err);
  } finally {
    await client.close();
  }
}

//getInsertUsersDB();
//getSelectUsersDB();
//module.exports = { getInsertUsersDB, getSelectUsersDB};
