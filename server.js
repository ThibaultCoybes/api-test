const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const log = require('./logFunction')
const mongoose = require('mongoose')
const articleRoute = require('./route/article.route')
const presentationRoute = require('./route/presentation.route');
const messageEmitter = require('./event');

require('dotenv').config()  

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('BDD: OK ✅');
    })
    .catch(err => console.log("BDD: ERROR ❌", err))

app.use(bodyParser.json());
app.use("/article", articleRoute)

app.use((req, res, next)=>{
    log.activityTracer(req)
    messageEmitter.emit('message_call', req.url)
    next()
})
app.use("/presentation", presentationRoute)
app.use("/pdf-generate", "/pdf/")
app.listen(5001, () => {
    log.writeLog('server.log', "Server Démarré ! ")
})