const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Ganti dengan username MySQL kamu
    password: 'jambi2002', // Ganti dengan password MySQL kamu
    database: 'sortify_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = db;
