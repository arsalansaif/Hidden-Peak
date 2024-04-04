const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  let removeComputer = () => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM ConsignmentStore.Computers WHERE computerId = ?', [event.computerId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve({ message: 'Computer removed successfully', affectedRows: results.affectedRows });
      });
    });
  };

  try {
    const result = await removeComputer();
    return { statusCode: 200, body: result };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not remove computer' }) };
  }
};