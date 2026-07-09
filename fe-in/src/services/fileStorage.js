const DB_NAME = "rsabl_file_storage";
const DB_VERSION = 1;
const STORE_NAME = "files";

const canUseIndexedDB = () =>
  typeof window !== "undefined" && typeof window.indexedDB !== "undefined";

const openDatabase = () =>
  new Promise((resolve, reject) => {
    if (!canUseIndexedDB()) {
      reject(new Error("IndexedDB is not available"));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const runTransaction = async (mode, callback) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = callback(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const saveFile = (key, filePayload) =>
  runTransaction("readwrite", (store) => store.put(filePayload, key));

export const getFile = (key) =>
  runTransaction("readonly", (store) => store.get(key));

export const deleteFile = (key) =>
  runTransaction("readwrite", (store) => store.delete(key));
