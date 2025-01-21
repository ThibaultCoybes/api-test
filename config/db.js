const mysql = require('mysql')
// const dbConfig = require('./db.config')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bci25",
    port: 8887 
})

connection.connect(err => {
    if(err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connected to MySQL database')
})

module.exports = connection