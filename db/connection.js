const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'max',
    password: 'maxPassword',
    database: 'employeeTracker'
}).promise()

module.exports = db