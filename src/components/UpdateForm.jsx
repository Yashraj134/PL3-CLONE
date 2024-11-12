import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ContactContext } from '../context/Contact';
import axios from 'axios'; // Don't forget to import axios

const UpdateForm = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 
    const location = useLocation();
    const { contact } = location.state || {};
    
    const { name, email, phone, address, contactId } = contact || {};

    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
        phone: phone || '',
        address: address || '',
    });

    const { updateContact } = useContext(ContactContext); // Destructure updateContact from context

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            return alert("All fields are required...!");
        }

        const updatedContact = {
            contactId,
            ...formData
        };

        try {
            const response = await axios.put(
                `http://localhost:3000/contacts/update/${contactId}`, 
                {updatedContact}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                updateContact(contactId, updatedContact);
                navigate('/'); // Navigate to the contacts list page
            }
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact.");
        }
    };

    return (
        <>
        <h2 as="h2" style={{
          textAlign: 'center', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '10px', 
          color: '#333'
        }}> Update contact..
        </h2>  
        <div className="ui middle aligned center aligned grid" style={{ height: '50vh',margin:'60px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
            <div className="column" style={{ height: '40vh',margin:'60px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
                <form className="ui form" onSubmit={handleOnSubmit} style={{ width: '400px', border: '1px solid black', borderRadius: '8px', padding: '20px' }}>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleOnChange} 
                            placeholder="Enter your name" 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleOnChange} 
                            placeholder="Enter your phone number" 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleOnChange} 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleOnChange} 
                            placeholder="Enter your address" 
                        />
                    </div>
                    <button className="ui button primary" type="submit">Update Contact</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default UpdateForm;
