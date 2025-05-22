import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: " sql12.freesqldatabase.com",
  user: "sql12780427",        // Replace with yours
  password: "pvDP8dGUp5",    // Replace with yours
  database: "sql12780427"       // Replace with yours
});
