var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PresentationSchema = new Schema({
    name: String,
    duration: Number,
    articles: [{ type: Schema.Types.ObjectId, ref: "Article"}]
})

module.exports = mongoose.model('presentation', PresentationSchema)