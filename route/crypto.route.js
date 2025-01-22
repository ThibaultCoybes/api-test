const express = require('express')
const router = express.Router()
const cryptoController = require('../controller/crypto.controller')

router.post('/postCrypto', cryptoController.create)
router.get('/getCryptos', cryptoController.findAll)

module.exports = router