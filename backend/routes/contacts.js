const express =require("express")
const route=express.Router()
const contactController=require('../controller/contacts')
const auth=require('../middleware/auth')

route.get('/',auth,contactController.getContacts);
route.delete('/delete/:contactId',auth,contactController.deleteContact)
route.put('/update/:contactId',auth,contactController.updateContact)
route.post('/add',auth,contactController.addContact)
route.get('/download',auth,contactController.downloadContacts)
module.exports=route;