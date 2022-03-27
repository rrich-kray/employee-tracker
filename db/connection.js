/*


Copyright (c) 2022, Ryan Kray
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. 

*/

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees",
});

const promiseConnection = db.promise(); // all queries on this db are returned as a promise

module.exports = promiseConnection;
