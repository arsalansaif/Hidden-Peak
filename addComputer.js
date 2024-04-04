const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  // const { storeId, price, memory, storage, processor, processorGeneration, graphics } = JSON.parse(event.body);

  const addComputer = () => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO ConsignmentStore.Computers (storeId, price, memory, storage, processor, processorGeneration, graphics) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [event.storeId, event.price, event.ram, event.storage, event.processor, event.processorGen, event.gpu], 
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
      });
    });
  };

  try {
    const computerId = await addComputer();
    return { statusCode: 200, body: JSON.stringify({ ComputerID: computerId }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not add computer = Error: ' + error }) };
  }
};
