const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride =require("method-override");
// ✅ Correctly set view engine and path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// ✅ Connect to DB
connectDB()
.then((res) => {
      console.log("connection successful");
    })
  .catch(err => console.log("DB Connection error:", err));

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index routes
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
})
//new routes
app.get("/chats/new",async(req,res)=>{

    res.render("new.ejs",);
})
////create route
app.post("/chats",(req,res)=>{
    let{from,msg,to}= req.body;
    let newChat= new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat .save()
    .then((res) => {
      console.log("chat was saved");
    })
  .catch(err => console.log( err));
    res.redirect("/chats");
});
//edit
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
let chat= await Chat.findById(id);
  res.render("edit.ejs",{chat});
})
//update route
app.put("/chats/:id", async(req,res)=>{
    let {id}= req.params;
    let {msg:newMsg} = req.body;
let updatechat=await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators:true,new:true});
res.redirect("/chats");
})
//delete route
app.delete("/chats/:id",async(req,res)=>{
  let {id}= req.params;
 let deleteChat= await Chat.findByIdAndDelete(id);
 res.redirect("/chats");
})
// ✅ Route
app.get("/", (req, res) => {
  res.send("hello");
});


// ✅ Start server
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

