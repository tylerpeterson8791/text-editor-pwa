import { openDB } from 'idb';

const jateDb = "jate"

const initdb = async () =>
  openDB(jateDb, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(jateDb)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(jateDb, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
   const bumrush = await openDB(jateDb, 1);

  const bumrushTransaction = bumrush.transaction(jateDb, 'readwrite');

  const bumrushStore = bumrushTransaction.objectStore(jateDb);

  const request = bumrushStore.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const bumrush = await openDB(jateDb, 1);
  const bumrushTransaction = bumrush.transaction(jateDb, 'readonly');
  const bumrushStore = bumrushTransaction.objectStore(jateDb);

  const request = bumrushStore.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();