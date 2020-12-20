const mongoose = require('mongoose');

//  Your code goes here
const mario = new mongoose.Schema({
     name: {
        type: String,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    }
  });
  
  const marioModel = mongoose.model("mariochar", mario);

module.exports = marioModel;
