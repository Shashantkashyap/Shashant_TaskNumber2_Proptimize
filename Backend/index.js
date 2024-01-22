const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./db");
const Port = process.env.PORT;
const userRoute = require("./route");
const cors = require("cors");

dbConnect();
app.use(express.json());
app.use(cors({
    origin:"https://t2-ui.onrender.com",
    credential:true
}))

app.get("/",(req,res)=>{
    res.send("this is home page")
})

app.use("/api",userRoute)

app.listen(Port, ()=>{
    console.log(`app is listening on port no ${Port}`)
})
