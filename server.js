const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const log = require('./logFunction')
const articleRoute = require('./route/article.route')
const cryptoRoute = require('./route/crypto.route')
const messageEmitter = require('./event');

require('dotenv').config()  

app.use(bodyParser.json());

app.use("/article", articleRoute)
app.use("/crypto", cryptoRoute)

app.use((req, res, next)=>{
    log.activityTracer(req)
    messageEmitter.emit('message_call', req.url)
    next()
})
app.listen(7008, () => {
    log.writeLog('server.log', "✅ - Server Démarré ! ")
})