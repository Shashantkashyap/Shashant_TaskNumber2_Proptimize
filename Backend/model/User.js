const mongoose = require("mongoose");
 const userSchema = new mongoose.Schema({
   firstName:{
      type:String,
      required: true
  },
  lastName:{
      type:String,
      required: true
  },
  email:{
      type:String,
      required: true
  },
  password:{
      type:String,
      required: true
  },
  
  address:{
      type:String,
      
  },
  contact:{
      type:String,
      
  },
  image:{
    type:String
  },
  OTP :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OTP"
  }
    
 })

 module.exports = new mongoose.model("User", userSchema);