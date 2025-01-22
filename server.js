const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const articleRoute = require('./route/article.route')
const cryptoRoute = require('./route/crypto.route')
const logger = require('./Middleware/logger')

require('dotenv').config()  

app.use(bodyParser.json());

app.use("/article", articleRoute)
app.use("/crypto", cryptoRoute)

app.use((err, req, res, next) => {
    logger.info(`Requete ${req.method} - ${req.url} - IP : ${req.ip}`)
    if(err){
        logger.crit(err)
    }
    next();
});

const port = 7008

app.listen(port, () => {
    console.log('✅ - Server Démarré ! ')
})