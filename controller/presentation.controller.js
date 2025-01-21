const Presentation = require("../model/Presentation")

exports.findAll = async (req, res) => {
    let presentations =  await Presentation.find()
    console.log("Presentation");
    res.json(presentations)
}

exports.createPresentation = async (req, res) => {
    let { message } = req.body
}