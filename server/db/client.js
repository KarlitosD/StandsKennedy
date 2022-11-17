
// }
import mysql from 'mysql2/promise'

// create the connection to database
export let connection;
(async () => {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    // connection.connect()
    
    // const [rows] = await connection.query(
    //   `
    //     select * from stands;
    //   `,
    // )
    // console.log(rows)
})()
