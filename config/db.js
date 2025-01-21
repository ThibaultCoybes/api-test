const mysql = require('mysql')
// const dbConfig = require('./db.config')

const connection = mysql.createConnection({
    host: "localhost",
    user: "paul",
    password: "Need4school",
    database: "bci25",
})

connection.connect(err => {
    if(err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connected to MySQL database')
})

module.exports = connection