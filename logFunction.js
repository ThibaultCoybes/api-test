const fs = require('fs');
const path = require('path')

exports.writeLog = (fichier, message) => {
    if(!fs.existsSync(fichier)){
        fs.writeFileSync(fichier, "", "utf8")
    }

    const logMessage = `${new Date().toISOString()} - ✅ ${message} \n`
    
    fs.appendFile(fichier, logMessage, (err)=>{
        if(err){
            console.error('❌ Error - ', err);
        };
    })
}

exports.activityTracer = async (req, res) => {
    const logMessage = `${new Date().toISOString()} - METHOD : ${req.method} / URL : ${req.get('host')}${req.url} \n ${req.body}`
    fs.appendFile("server.log", logMessage, (err)=>{
        if(err){
            console.error('❌ Error - ', err)
        }
    })
}

exports.rotateLog = () => {
    const MAX_LOG_SIZE = 5 * 1024 * 1024;
    const stats = fs.statSync('request.log')
    if(stats.size >= MAX_LOG_SIZE){
        const unique = `request${Date.now()}.log`
        fs.renameSync(`request.log`, path.join(__dirname, unique))
        fs.writeFileSync('request.log', "", "utf8")
    }
}