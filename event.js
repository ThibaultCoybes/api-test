const EventEmitter = require("events")
const eventEmitter = new EventEmitter()

const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const fs = require('fs');

eventEmitter.on('message_call', (route) => {
    console.log('Emetteur / Route : ', route)
})

eventEmitter.on('pdf-generate', (path) => {
    console.log("HEREEE", path)
    doc.pipe(fs.createWriteStream(path + '/pdf-generate.pdf')); 
    doc.pipe(res);
    doc.end();
})


module.exports = eventEmitter