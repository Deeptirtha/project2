const express=require("express")
const bodyparser=require ("body-parser")
const app=express()
const route =require("../src/rout/rout")
 const mongoose=require("mongoose")
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended:true}))

 mongoose.connect("mongodb+srv://DeeptirthaMukherjee:QYKI3k8QSKC4I7FZ@cluster1.khatgm1.mongodb.net/project2-db?retryWrites=true&w=majority",{
useNewUrlParser:true
 })

 .then(()=>console.log("Mongo-DB is connected"))
 .catch(err=> console.log(err.msg))

 app.use("/",route)
 app.listen(process.env.PORT || 3000, function(){
    console.log("Port running at "+(process.env.PORT||3000))
 })