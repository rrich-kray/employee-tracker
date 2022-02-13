const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
})

const promiseConnection = db.promise() // all queries on this db are returned as a promise

module.exports = promiseConnection