const mongooose=require("mongoose")

const createSchema=new mongooose.Schema({
    title:{
        type:String,
       
    },
    body:{
        type:String,
      
    },
    image:{
        type:String,
       
    },
    userId:{
        type:String,
      
    }
})

const newUserdata=new mongooose.model("postuser",createSchema)
module.exports=newUserdata