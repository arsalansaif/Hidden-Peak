const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  // console.log(event.storeId)

  const generateInventory = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM ConsignmentStore.Computers WHERE storeId = ?', [event.storeId], (error, rows) => {
        if (error) {
          return reject(error);
        }
        resolve(rows);
      });
    });
  };

  try {
    const inventory = await generateInventory();
    return { statusCode: 200, body: JSON.parse(JSON.stringify(inventory))};
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not generate inventory' }) };
  }
};