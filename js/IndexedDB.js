import idb from 'idb'

class IndexedDB {
  constructor (DBName = 'test', storeName = 'todolist') {
    this._storeName = storeName;
    this._dbPromise = idb.open(DBName, 1, (upgradeDB) => {
      if (!upgradeDB.objectStoreNames.contains(storeName)) {
        upgradeDB.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
      }
      console.log('connect DB success!')
    });
  }
  
  getOne(key) {
    return this._dbPromise.then((db) => {
      return db.transaction(this._storeName).objectStore(this._storeName).get(key);
    });
  }

  getAll() {
    return this._dbPromise.then((db) => {
      return db.transaction(this._storeName).objectStore(this._storeName).getAll();
    })
  }

  addOrSet(item, key) {
    return this._dbPromise.then((db) => {
      const tx = db.transaction(this._storeName, 'readwrite');
      const store = tx.objectStore(this._storeName);
      if (key) {
        store.put(item, key);
      } else {
        store.add(item);
      }
      return tx.complete;
    });
  }

  delete(key) {
    return this._dbPromise.then((db) => {
      const tx = db.transaction(this._storeName, 'readwrite');
      tx.objectStore(this._storeName).delete(key);
      return tx.complete;
    });
  }
}

export default new IndexedDB();