const express =require("express")
const app=express();
require('dotenv').config();
const bodyparser=require('body-parser')
const cors=require('cors');
const userRoute=require('./routes/users');
const contactRoute=require('./routes/contacts')

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use('/users',userRoute);
app.use('/contacts',contactRoute);


app.listen(process.env.PORT,()=>{
    console.log("server connected")
})