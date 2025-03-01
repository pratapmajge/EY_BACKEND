const express = require('express')
const mongoDB = require("./db");

const app= express()
const port = 5000

mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/api' ,require('./Routes/CreateUser.js'))
app.get('/', (req , res) =>{
    res.send('hello')
})

app.listen(port , () =>{
    console.log(`example listening on port ${port}`)
})
