const express = require('express')
const router = express.Router()
const articleController = require('../controller/article.controller')

router.get('/postArticle', articleController.findAll)

module.exports = router