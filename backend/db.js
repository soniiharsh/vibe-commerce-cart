const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let dbPromise = open({
  filename: path.join(__dirname, 'data.sqlite'),
  driver: sqlite3.Database
}).then(async (db) => {
  // create tables if not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      price REAL,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      productId INTEGER,
      qty INTEGER,
      FOREIGN KEY(productId) REFERENCES products(id)
    );
    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      total REAL,
      timestamp TEXT
    );
  `);
  return db;
});

module.exports = {
  async run(sql, params=[]) {
    const db = await dbPromise;
    return db.run(sql, params);
  },
  async get(sql, params=[]) {
    const db = await dbPromise;
    return db.get(sql, params);
  },
  async all(sql, params=[]) {
    const db = await dbPromise;
    return db.all(sql, params);
  }
};
