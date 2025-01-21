const express = require('express')
const router = express.Router()
const presentationController = require('../controller/presentation.controller')
const log = require('../logFunction')

router.get('/getPresentation', presentationController.findAll)
router.post("/createPresentation", presentationController.createPresentation)

module.exports = router

// PORT 7008
// http://bci25