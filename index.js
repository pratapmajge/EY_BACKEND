const express = require('express')
const mongoDB = require("./db");

const app= express()
const port = 5000

mongoDB();

app.get('/', (req , res) =>{
    res.send('hello')
})
app.use(express.json())

app.use('/api' ,require('./Routes/CreateUser.js'))
app.listen(port , () =>{
    console.log(`example listening on port ${port}`)
})
