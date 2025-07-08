const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

connectDB()
.then((res) => {
      console.log("connection successful");
    })
  .catch(err => console.log("DB Connection error:", err));

   async function connectDB() {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
      }

let allChats=[
     {
            from: "ayushi",
            to: "anshika",
            msg: "send me your exam sheets",
            created_at: new Date()
          },
          {
            from: "babita",
            to: "shresht",
            msg: "send me your exam sheets",
            created_at: new Date()
          }
];
 Chat.insertMany(allChats);


      
          
      

      
     