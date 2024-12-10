const express = require("express");
const cors = require("cors");
const server = express()
const mongoose = require("mongoose")
const orderDetail = require("./Modal/orderModel");
const products = require("./Modal/itemModel");
const adminDetail = require("./Modal/AdminModal");
require('dotenv').config();
const port = process.env.PORT;

//CORS
const allowedOrigins = [process.env.AllowedOrigins];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

server.use(cors(corsOptions));




server.use(express.json()) 

mongoose.connect(process.env.MONGO_URL).then((e) =>
  console.log('db connect') 
).catch((err) =>
  console.log(err)
);
 
//Products

//Get the responce as products data
server.get('/nbgs/products',async (req,res)=>{
  const productsInfo = await products.find();
  res.json(productsInfo)
})

//update products name,rate,...
server.put('/nbgs/products/:id',async (req,res)=>{ 
  const { id } = req.params;
  const updateData = await products.findByIdAndUpdate(id,req.body);
  res.status(201).send(updateData);
})

//Add more products
server.post("/nbgs/products", async(req,res)=>{
  try{
  const data = req.body;
  const update = new products(data);
  const updated = await update.save();
  if(updated)
  res.status(201).send("Added")
  }
  catch(err){res.status(500).send(err );}
})
//Delete Products
server.delete("/nbgs/products/:id",async(req,res)=>{
  try {
    const { id } = req.params;

    // Find and delete the order by its ID
    const deletedOrder = await products.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send({ error: "Order not found" })
    }

    res.status(200).send({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ error: "Failed to delete the order" });
  }
  
})




// OrderedItems

server.post("/nbgs/orderedItems",async (req,res)=> {
  try{
    let userOrder = new orderDetail({
      items: req.body.items,
      DeliverLocation: req.body.DeliverLocation,
      PersonInformation: req.body.PersonInformation,
      OrderAmount: req.body.OrderAmount
    });
    const order = await userOrder.save();
    
    res.status(201).send(order);
    
  }
  catch(err){
    console.error("error in saving data", err);
    res.status(500).send({error:"failed to save the order"});
  }  
})

server.get('/nbgs/orderedItems', async (req,res)=>{
  const order = await orderDetail.find();
  
  res.json(order);
})
server.delete("/nbgs/orderedItems/:id",async(req,res)=>{
  try {
    const { id } = req.params;

    // Find and delete the order by its ID
    const deletedOrder = await orderDetail.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send({ error: "Order not found" })
    }

    res.status(200).send({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ error: "Failed to delete the order" });
  }
  
})



//admin username and password and notice and contact

server.get("/nbgs/admindetail", async(req,res)=>{
  const data = await adminDetail.find();
  res.json(data);
})
server.put("/nbgs/admindetail/:id", async(req,res)=>{
  const { id } = req.params;
  const updateData = req.body;
  const updatedData = await adminDetail.findByIdAndUpdate(id,updateData);
  if (!updatedData) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(200).json( { message: 'Resource updated successfully' });

})


// Server Listen

server.listen(port, ()=>{
  console.log(`listening at port ${port}`);
  
})
