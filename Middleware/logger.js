const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = winston;
const nodemailer = require('nodemailer');
/*
const logger = createLogger({
    format: combine(
        label({ label: 'Request API' }),
        winston.format.json(),
        timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        })
    ]
});

exports.logStartup = (port) => {
    logger.info({
        event: '✅ API_STARTUP',
        message: `API démarrée sur le port ${port}`,
        date: new Date().toISOString()
    });
};

exports.logApiCall = (req, res) => {
    logger.info({
        event: '⏳ API_CALL',
        date: new Date().toISOString(),
        method: req.method,
        url: req.url,
        body: req.body,
        status: res.statusCode,
    });
};

exports.logError = (err, req) => {
    const severity = err.status >= 500 ? 'error' : 'warn';
    logger[severity]({
        event: '❌ API_ERROR',
        error: {
            message: err.message,
            status: err.status || 500,
            stack: err.stack
        },
        request: {
            method: req.method,
            url: req.url,
            body: req.body,
        }
    }, transports[1]);
};

*/

const logLevel = {
    "info": 0,
    "warn": 1,
    "error": 2,
    "crit": 3
}

const logFormat = format.combine(
    format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
    format.printf(({timestamp, level, message}) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
)

const logger = createLogger({
    levels: logLevel.levels,
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: path.join(__dirname, 'logs', 'app-%DATE%.log'),
            datePattern: 'DD-MM-YYYY',
            maxSize: '5m',
        }),
        new transports.DailyRotateFile({
            filename: path.join(__dirname, 'logs', 'error-%DATE%.log'),
            datePattern: 'DD-MM-YYYY',
            maxSize: '5m',
        })
    ]
})

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

async function sendEmail(err) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: '❌ Erreur CRITIQUE sur le serveur',
            text: err,
            html: `<h2>❌ Erreur CRITIQUE sur le serveur ⛔️</h2><p>${err}</p>`
        }
        await transporter.sendMail(mailOptions)
        console.log('✅ Email envoyé avec succès')
    } catch (error) {
        console.log(error)
    }
}

logger.on('crit', (err) => {
    logger.crit('Erreur critique detecté ' +  err.message)
    sendEmail(err.message)
    console.log("ERREUR CRITIQUE ENVOYER PAR EMAIL", err.message)
})

module.exports = logger