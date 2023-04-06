const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/user-api")
.then(res=>{
    console.log("connection successful")
}).catch(res=>{
    console.log("error")
})

