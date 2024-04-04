const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    const pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    const getStoreLocation = (computerId) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT Stores.latitude, Stores.longitude, Stores.storeId FROM ConsignmentStore.Stores JOIN ConsignmentStore.Computers ON Stores.storeId = Computers.storeId WHERE Computers.computerId = ?', [computerId],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(results)
                    resolve(results[0]);
                }
            );
        });
    };

    try {
        
        const storeLocation = await getStoreLocation(event.computerId);
        
        console.log(storeLocation)
        
        if (storeLocation) {
            return {
                statusCode: 200,
                body: storeLocation
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Store not found' })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve store location. Error: ' + error })
        };
    }
};
