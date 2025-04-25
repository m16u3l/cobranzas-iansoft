import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "cobranzas_db",
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

export { pool };
