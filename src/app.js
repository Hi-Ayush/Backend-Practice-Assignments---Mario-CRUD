const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario",(req,res)=>{
    marioModel.find().then((output)=>{res.send(output)});
});

app.get("/mario/:id",(req,res)=>{
    const id=req.params.id;
//     marioModel.findById(id)
//         .then((result)=>{
//         if(!result){
//         res.status(400).send({message: 'Invalid id '});
//             return;
//         }
    marioModel.findById(id, null, null, function(err, result) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: err.message });
            return;
        }
        res.json(result);
    })
//         res.status(200).send(result)})
       
});
app.post("/mario",(req,res)=>{
    const {name,weight}=req.body;
    const newMarioCharacter=new marioModel({
        name:name,
        weight:weight
    });
    newMarioCharacter.save()
        .then((newMarioCharacter)=>{res.status(201).send(newMarioCharacter)})
        .catch((error)=>res.status(400).send({
            message: 'either name or weight is missing'
    }));
});


app.patch("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((mario) => res.send(mario))
    .catch((error) => res.status(400).send({ 
        message: error.message 
    }));
});

app.delete("/mario/:id",(req,res)=>{
    const id=req.params.id;
//     marioModel.findByIdAndDelete(id)
//         .then((result)=>{
//         if(!result){
//         res.status(400).send({message: 'Invalid id '});
//             return;
//         }
    marioModel.findByIdAndDelete(id, null, null, function(err, result) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: err.message });
            return;
        }
        res.status(200).send({message: 'character deleted'})})
    })
      
//     marioModel.findByIdAndDelete(id)
//         .then((result) => res.json({ message: 'character deleted' }))
//         .catch((err) => res.status(400).json({ message: err.message })); 
       
})

module.exports = app;
