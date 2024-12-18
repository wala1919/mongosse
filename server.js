const express = require("express")
const app = express()
const mongoose= require("mongoose")
app.use(express.json())
app.use("/api", require("./Routes/userRoutes"))



mongoose.connect(https://cloud.mongodb.com/v2/6760045c94f3e40cf7a0c0de#/host/replicaSet/676005457209d2145a4ec5e6
).then(()=>console.log("database connected"))


const PORT =5000
app.listen(PORT,()=> console.log("my server is running on port ",PORT))