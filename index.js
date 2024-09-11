// config inicial 
const express = require('express')
const {trusted}=require('mongoose')
const app = express()

app.listen(3000)
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use (express.json())

//primeirarota
app.get('/',(req,res)=>{
    res.json({message: "rodou"})
})