require("dotenv").config();

const Pool = require("pg").Pool;
const mysql = require("mysql2/promise");

 
//Postgres Instance
const pool = new Pool({
  host: `${process.env.PGHOST}`,
  user: `${process.env.PGUSER}`,
  password: `${process.env.PGPASSWORD}`,
  port: `${process.env.PGPORT}`,
  database: `${process.env.PGDATABASE}`,
  ssl: true,
});

//Mysql Instance
const db = mysql.createPool({
  host: `${process.env.MYSQL_HOST}`,
  user: `${process.env.MYSQL_USERNAME}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
});

 
module.exports = {
  pool,
  db,
};
