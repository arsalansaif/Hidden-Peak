const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  const addBalance = () => {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE ConsignmentStore.Site SET balance = balance + ? WHERE username = 'admin'", [event.balance], (error, rows) => {
        if (error) {
          return reject(error);
        }
        resolve(rows);
      });
    });
  };

  try {
    const inventory = await addBalance();
    return { statusCode: 200, body: JSON.parse(JSON.stringify(inventory))};
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not add balance' }) };
  }
};

