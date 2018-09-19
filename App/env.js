const mysql = require('mysql');
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'user_profile'
});
mc.connect();

module.exports = mc;