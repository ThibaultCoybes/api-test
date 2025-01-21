const express = require('express')
const router = express.Router()
const cryptoController = require('../controller/crypto.controller')

router.post('/postCrypto', cryptoController.create)

module.exports = router