const Crypto = require('../model/Crypto.mysql')

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send(
            {
                message: 'Content can not be empty'
            }
        )
    }

    const cryptoInsert = new Crypto({
        name: req.body.name,
        price: req.body.price,
    })

    Crypto.create(cryptoInsert, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error while creating the crypto'
            })
        }
        res.send(data)
    })
}

exports.findAll = (req, res) => {
    Crypto.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Error while retrieving the crypto'
            })
        }
        res.send(data)
    })
}