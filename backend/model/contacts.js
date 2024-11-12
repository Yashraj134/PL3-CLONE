const pool=require('../config/db')
require('dotenv').config()

exports.getContacts=async (userId)=>{
    try{
        console.log("hii shweta")
        const [rows]=await pool.query('SELECT * FROM contacts WHERE userId=?',[userId])
        console.log(rows)
        console.log(rows)
        return rows;
    }catch(err){
        console.log(err.message)
        return err.message;
    }
}

exports.downloadContacts=async (userId)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM contacts WHERE userId=?',[userId])
        return rows;
    }catch(err){
        console.log(err.message)
        return err.message;
    }
}

exports.addContact=async (contact,userId)=>{
    const {name,email,phone,address,contactId}=contact;
    try{
        console.log(contact)
        const result=await pool.query('INSERT INTO contacts (contactId,name,email,phone,address,userId) VALUES (?,?,?,?,?,?)',[contactId,name,email,phone,address,userId])
        return result;
    }catch(err){
        console.log(err.message)
        return err.message;
    }
}

exports.deleteContact = async (userId, contactId) => {
    try {
        const result = await pool.query("DELETE FROM contacts WHERE userId = ? AND contactId = ?", [userId,contactId]); 
        return result;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
};


exports.updateContact=async (contactId,id,updatedContact)=>{
    const {name,email,phone,address}=updatedContact;
    try{
        const result=await pool.query('Update contacts set name=?,address=?,email=?,phone=? Where userId=? and contactId=?',[name,address,email,phone,id,contactId])
        return result;
    }catch(err){
        return err.message;
    }
}