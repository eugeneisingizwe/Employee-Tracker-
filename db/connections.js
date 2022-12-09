// Import and require mysql2
const mysql2 = require("mysql2");
require("dotenv").config();

// Connect to database
const db = mysql2.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // Adding MySQL password here
      password: process.env.DB_PASSWORD,
      database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
  );

 module.exports = db;