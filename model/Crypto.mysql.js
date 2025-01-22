const sql = require('../config/db')

const Crypto = function(crypto){
    this.name = crypto.name;
    this.price = crypto.price;
}

Crypto.create = (newCrypto, result) => {
    sql.query('INSERT INTO crypto SET ?', newCrypto, (err, res) => {
        if(err){
            console.log('error: ', err)
            result(err, null)
            return
        }
        result(null, {id: res.inserId, ...newCrypto})
    })
}

Crypto.findAll = (result) => {
    sql.query('SELECT * FROM crypto', (err, res) => {
        if(err){
            console.log('error: ', err)
            result(err, null)
            return
        }
        result(null, res)
    })
}

module.exports = Crypto