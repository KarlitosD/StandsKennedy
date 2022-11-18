import mysql from "mysql2/promise"

export let connection;
(async () => {
  const { db } = useRuntimeConfig()
  connection = await mysql.createPool({
    ...db,
    connectionLimit: 10,
  });

  // await connection.query(`
  //   CREATE TABLE IF NOT EXISTS stands (
  //       id varchar(10) PRIMARY KEY NOT NULL,
  //       NAME varchar(150) DEFAULT NULL
  //       );
  //   `)
  // await connection.query(`
  //     CREATE TABLE IF NOT EXISTS stands_user (
  //       standId varchar(10),
  //       voted varchar(50),
  //       PRIMARY KEY (standId, voted),
  //       FOREIGN KEY (standId) REFERENCES stands(id)
  //     )
  //   `)
})()