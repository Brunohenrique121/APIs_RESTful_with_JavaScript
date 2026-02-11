const mysql = require("mysql2/promise");
require("dotenv").config();

//console.log(process.env.DB_USER, process.env.DB_HOST, process.env.DB_PASSWORD);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthoried: true
    },
});

module.exports = pool;