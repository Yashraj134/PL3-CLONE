const express=require('express')
const route=express.Router();
const userContoller=require('../controller/users')

route.post('/login',userContoller.login)
route.post('/signup',userContoller.signup)

module.exports=route;