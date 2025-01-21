const express = require('express')
const router = express.Router()
const eventEmitter = require('./event');

router.post("/pdf-generate", (err)=>{
    if(err){
        console.log("ERROR", err);
        return
    }
    eventEmitter.emit("pdf-generate", )
})

module.exports = router