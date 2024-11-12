import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios'; 
import { ContactContext } from '../context/Contact';

const ContactForm = () => {
    const navigate=useNavigate();

    const {addContact}=useContext(ContactContext);

    const name=useRef('');
    const email=useRef('');
    const number=useRef('');
    const address=useRef('');

    const contactId=uuidv4();
    const token=localStorage.getItem('token')

    const handleOnSubmit=async (e)=>{
        e.preventDefault();

        if(!name.current.value||!email.current.value ||!number.current.value ||!address.current.value ){
            return alter("all fields are required...!")
        }

        const contact={
            contactId,
            name:name.current.value ,
            email:email.current.value ,
            phone:number.current.value ,
            address:address.current.value 
        }

        try {
            const response = await axios.post('http://localhost:3000/contacts/add', { contact }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            });

            console.log(contact)
    
            addContact(contact);
            name.current.value ='';
            email.current.value ='';
            address.current.value ='';
            number.current.value ='';
            navigate('/');
    
        } catch (error) {
            navigate('/login');
            console.error('Error adding contact:', error.response?.data || error.message);
        }
        
    }
    return (
        <><h2 as="h2" style={{
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 'bold',  
            color: '#333'
          }}> Add Contact..
          </h2>  
        <div className="ui middle aligned center aligned grid" style={{ height: '10vh',margin:'60px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
            <div className="column" style={{ height: '20vh',margin:'60px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
                <form className="ui form" onSubmit={handleOnSubmit} style={{ width: '400px', border: '1px solid black', borderRadius: '8px', padding: '20px' }}>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" ref={name} name="name" placeholder="Enter your name" />
                    </div>
                    <div className="field">
                        <label htmlFor="number">Phone Number</label>
                        <input type="tel" ref={number} name="number" placeholder="Enter your phone number" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" ref={email} name="email" placeholder="Enter your email" />
                    </div>
                    <div className="field">
                        <label htmlFor="address">Address</label>
                        <input type="text" ref={address} name="address" placeholder="Enter your address" />
                    </div>
                    <button className="ui button primary" type="submit">Add Contact</button>
                </form>
            </div>
        </div>
    </>
    );
};

export default ContactForm;
