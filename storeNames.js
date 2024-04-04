const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  let getAllStores = () => { //get all store names
    return new Promise((resolve, reject) => {
      pool.query('SELECT storeName FROM Stores', (error, rows) => {
        if (error) {
          return reject(error);
        }
        if (rows && rows.length > 0) {
          return resolve(rows);
        } else {
          return reject("No stores found.");
        }
      });
    });
  };

  try {
    const allStores = await getAllStores();
    var jsonResult = JSON.parse(JSON.stringify(allStores));
    return {'statusCode': 200, 'body': jsonResult };
  } catch (error) {
    return {'statusCode': 500, 'body': JSON.stringify({ error: 'Could not retrieve store names' })};
  }
};