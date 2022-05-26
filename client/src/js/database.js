import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jateHALEY database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 

  console.log('PUT to the database');
  
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;

  // result is equal to 1
  console.log('data saved to database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

   // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(id);

  // Get confirmation of the request.
  const result = await request;

  console.log('result.value', result?.value);

  return result?.value;
 
};

initdb();