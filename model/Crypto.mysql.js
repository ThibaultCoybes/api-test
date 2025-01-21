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

module.exports = Crypto