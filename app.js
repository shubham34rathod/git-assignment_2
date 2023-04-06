const express=require("express")
const app=express();
require("./connection/conn.js")
const userData=require("./user")
const newUserdata=require("./newuser/newuser")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/register", async(req,res)=>{
    // console.log(req.body)
    try{
        let securePass=await bcrypt.hash(req.body.password,10)
     const createData=new userData({
        name:req.body.name,
        email:req.body.email,
        password:securePass
     })
    const data= await createData.save()
     res.send(data).status(201)
    }
    catch(e){
        res.status(400).send(e)
    }
})

app.post("/login",async(req,res)=>{

    try{

    let userEmail=await userData.findOne({email:req.body.email})
    if(userEmail){
        let matchpass=await bcrypt.compare(req.body.password,userEmail.password)
        if(matchpass)
        {
            const token=await jwt.sign({_id:userEmail._id},"secret_key")

            res.send({status:"login successful",token:token}).status(200)
            console.log(token)
        }
        else{
            res.status(400).send("invalid data")
        }
    }
    else{
        res.status(400).send("not register")
    }
   
    // if(userEmail){

      
    //     if(userEmail[0].password===req.body.password)
    //     {
    //           res.send("login successful")   
              
    //     }else{
    //        res.send("incorrect password")
    //     }
    // }
    // else{
    //        res.send("invalid email")
    // }
    // console.log(userEmail)
    }
    
    catch(error){
        res.send("error")
    }
})



app.post("/posts",async(req,res)=>{
    try{
        if(req.headers.authorization){
            
            let userverify=await jwt.verify(req.headers.authorization,"secret_key")
            // console.log(userverify)
            let createnew=new newUserdata({
                title:req.body.title,
                body:req.body.body,
                image:req.body.image,
               userId:userverify._id
            })
           let data= await createnew.save()
            res.send(data)
        }
        else{
            res.status(400).send("error")
        }
      
    }
    catch(e){
        res.send(e)
    }
})

app.put("/posts/:id",async(req,res)=>{
    try{
        
            let usertoken=await jwt.sign({_id:userEmail._id},"secret_key")
            console.log(usertoken)
        
     const data=await newUserdata.findByIdAndUpdate(req.params.id)
     res.send(id)

    }
    catch(e)
    {
        res.send(e)
    }
})

app.delete("/posts/:id",async(req,res)=>{
    try{
       const _id=req.params.id
       const data=await newUserdata.findByIdAndDelete(_id)
    res.send(data)
    }
    catch(e){
        res.send(e)
    }
})




app.listen(3000,()=>{
    console.log("run")
})







