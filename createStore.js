const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  console.log(event);
  //const { storeName, latitude, longitude, username, password } = JSON.parse(event.body);

  const createStore = (event) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO ConsignmentStore.Stores (storeName, latitude, longitude, username, password) VALUES (?, ?, ?, ?, ?)', 
        [event.storeName, event.latitude, event.longitude, event.username, event.password], 
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
        }
      );
    });
  };

  try {
    const storeId = await createStore(event);
    return { statusCode: 200, body: JSON.stringify({ storeId }) };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not create store = Error: ' + error }) };
  }
};
