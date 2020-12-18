const mongoose = require('mongoose');

//  Your code goes here
const mario = new mongoose.Schema({
    name:String,
    weight:Number
  });
  
  const marioModel = mongoose.model("marioModel", mario);

module.exports = marioModel;