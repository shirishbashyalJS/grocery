const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    rate: Number,
    ProductAmount: Number,
    quantity: Number
  }
)

const orderSchema = new mongoose.Schema(
  {
  items:{
    type: [orderItemSchema]
  },
  DeliverLocation:{
    latitudeDeliver: Number,
    longitudeDeliver: Number
  },
  
  OrderAmount:Number,

  PersonInformation:{
    latitude: Number,
    longitude: Number,
    email: String,
    password: String,
    contact: String
  }
}
)

const  userOrderDetail = mongoose.model("orderDetail",orderSchema);

module.exports = userOrderDetail;