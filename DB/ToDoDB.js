import {MongoClient} from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

userName = process.env.DB_USERNAME;
password = process.env.DB_PASSWORD;
cluster = process.env.CLUSTER_URI;

const client = new MongoClient(`mongodb+srv://${userName}:${password}${cluster}`);

async function run() {
  try {
    // Connect to your cluster
    await client.connect();
    
    // Access your database and collection
    const db = client.db('UniversalDictionary');
    const collection = db.collection('EnglishToHebrew');
    return collection
  } catch (err) {
    return console.error('An error occurred:', err);
  }
}

const collection = run().catch(console.error);


const getInsertUsersDB = async () => {
  try {
    // Insert data directly
    const result = await collection.insertMany([
        { userName: "abcd", password: "efgh" },
      ]);
  
      console.log(`${result.insertedCount} documents inserted.`);
  } catch (e) {
    new Error(e.message);
  }
};


const getInsertToDoDB = async () => {
    try {
    // Insert data directly
    const result = await collection.insertMany([
        { userName: "abcd", password: "efgh" },
      ]);
  
      console.log(`${result.insertedCount} documents inserted.`);
    } catch (e) {
      return new Error(e.message);
    }
  };

  
const getSelectUsersDB = async (SearchWord) => {
  try {
    const query = {
      name: {
        username: "1234",
        password: "5678"
      }
    };
  const result = await collection.find(query);

  // Use toArray to convert the cursor to an array for easier processing
  const documents = await result.toArray();

  if (documents.length === 0) {
      console.log("Email or password is incorrect.");
      return null
} else {
    documents.forEach(document => {
    const result = [document.name, document.value]
    console.log(document);
    return result
    });
  }  
  } catch (err) {
    return console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

const getSelectToDoDB = async (SearchWord) => {
    try {
      const query = {
        name: {
          $regex: SearchWord,
          $options: "i" // Use 'i' for case-insensitive matching, remove it for case-sensitive matching
        }
      };
    const result = await collection.find(query);
  
    // Use toArray to convert the cursor to an array for easier processing
    const documents = await result.toArray();
  
    if (documents.length === 0) {
        console.log("The information you were looking for was not found.");
        return null
  } else {
      documents.forEach(document => {
      const result = [document.name, document.value]
      console.log(document);
      return result
      });
    }  
    } catch (err) {
      return console.error('An error occurred:', err);
    } finally {
      await client.close();
    }
  }

module.exports = { getInsertUsersDB, getInsertToDoDB, getSelectUsersDB, getSelectToDoDB};
