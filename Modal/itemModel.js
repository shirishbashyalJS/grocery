



const mongoose = require("mongoose");

const indiProductSchema = new mongoose.Schema({
  name: {type: String,required: true},
  image: {type:String,required: true},
  rate: {type:Number,required: true},
  unit: {type: String,required: true},
  available: {
    type:Boolean,
  default: true},
  bestItem: {type:Boolean,default: false},
  type: String
}, { _id: true }); // Explicitly ensure each product inside the array has an _id



const products = mongoose.model("products", indiProductSchema);

module.exports = products;
