const mongoose = require('mongoose')


mongoose.connect(
    'mongodb://user:qwerty1@ds026658.mlab.com:26658/gridncloud'
)

const connection = mongoose.connection

connection.on('error', function(){
    console.log('Connect error')
})

connection.once('open', async function(){
    console.log('MongoDB successfully connected')
})

module.exports = connection