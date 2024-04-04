const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  let generateCustomerInventory  = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT s.storeName, c.computerId, c.memory, c.storage, c.processor, c.processorGeneration, c.graphics, c.price' +
        ' FROM ConsignmentStore.Stores as s  JOIN ConsignmentStore.Computers AS c' + 
        ' ON c.storeId = s.storeId', (error, rows) => {
        if (error) { 
          return reject(error); 
        }
        if (rows) {
          return resolve(rows);
        } else {
          return reject("No inventory found.");
        }
      });
    });
  }

  try {
    const inventory = await generateCustomerInventory();
    var jsonResult = JSON.parse(JSON.stringify(inventory));
    pool.end();
    return {'statusCode': 200, 'body': jsonResult };
  } catch (error) {
    console.log(error)
    pool.end();
    return {'statusCode': 500, 'body': JSON.stringify({ error: 'Could not generate customer inventory' })};
  }
};