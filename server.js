const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')


const PORT = 3000

const app = express()
app.use(cors())
const api = require('./routes/api')
app.use(bodyParser.json())

app.use('/api', api)
app.get('/', function(req, res){
    res.send('hello')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:'+PORT)
})