const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  const storeLogin = () => {
    return new Promise((resolve, reject) => {
      console.log("running SQL query")
      pool.query('SELECT * FROM ConsignmentStore.Stores WHERE username=? AND password=?', [event.username, event.password],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if ((results)) {
              return resolve(results);
          } else {
              return reject("unable to locate store for user '" + event.username + "'");
          }
          
        }
      );
    });
  };

  try {
    const result = await storeLogin(event);
    var jsonResult = JSON.parse(JSON.stringify(result));

    
    console.log(jsonResult)
    return { statusCode: 200, body: jsonResult };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not create store = Error:r' + error }) };
  }
};