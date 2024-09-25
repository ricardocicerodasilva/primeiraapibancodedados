// config inicial 
const express = require('express')
const { default: mongoose} =require('mongoose')
const Person=require("./models/Person");
const app = express();


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


//Create 
app.post("/person",async(req, res)=>{
    const{name,salary,approved}=req.body;

    const person = {
        name,
        salary,
        approved
    }
    try{
        await Person.create(person)
        res.status(201).json({message:"pessoa inserida no sistema com sucesso!"})
            }
catch(error){
    res.status(500).json({erro: error})
}

})
//Read
app.get ("/person", async(req, res)=>{
    try{
        const peaple = await Person.find()
        res.status(200).json(peaple)

    }catch(error){
        res.status(500).json({erro: error})
    }
})
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("uhull conectamos!")
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})
// Read by id
app .get("/person/:id",async (req, res)=>{
    const id = req.params.id
    try{
        const peaple = await Person.findOne({_id: id})
        if(!peaple){
            res.status(422).json({message:"usuario não encontrado!"})
            return
        }
        res.status(200).json(peaple)
            }catch(error){
                res.status(500).json({erro: error})
            }
})

//update
app.patch("/person/:id", async (req, res)=>{
    const id = req.params.id

    const{name,salary,approved}=req.body

    const person={
        name,
        salary,
        approved
    }
    try{
        const updatePerson=await Person.updateOne({_id:id},person)

        if(updatePerson.matchedCount===0){
            res.status(422).json({message:"usuario não encontrado"})
        return        
        }
        res.status(200).json(person)
    }catch(error){
        res.status(500).json({erro: error})
    }
})
//delete

app.delete("/person/:id", async (req, res)=>{

    const id = req.params.id
    const person=await Person.findOne({_id: id})
       
    if(!person){
        res.status(422).json({message:"usuario não encontrado"})
        return  
    }
    try{
        await Person.deleteOne({_id:id})
        res.status(200).json({message:"usuario removido com sucesso"})
                     
        
       
    }catch(error){
        res.status(500).json({erro: error})
    }
})