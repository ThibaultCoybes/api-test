const EventEmitter = require("events")
const eventEmitter = new EventEmitter()

eventEmitter.on('message_call', (route) => {
    console.log('Emetteur / Route : ', route)
})

module.exports = eventEmitter