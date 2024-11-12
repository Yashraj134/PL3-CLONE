import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/Contact';


const ContactItem = ({contact}) => {
    const navigate=useNavigate();

    const  { deleteContact}=useContext(ContactContext)
    const { contactId,name,email} = contact||{};

    const handleONClick=(e)=>{
        navigate(`/contact/${contactId}`,{state:{contact:contact}})
    }

    const token=localStorage.getItem('token')

    const handleOnDelete = async (e) => {
        e.stopPropagation(); 
    
        try {
            console.log(token);
        
            const response = await axios.delete(`http://localhost:3000/contacts/delete/${contactId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { contact }  // This is where you send the contact data for DELETE (if needed)
            });
        
            // Assuming the API returns a successful response
            if (response.status === 200) {
                deleteContact(contactId); // Call the function to update state
                console.log('Contact deleted successfully');
            } else {
                console.error('Failed to delete the contact');
            }
        } catch (err) {
            console.error('Error deleting the contact:', err);
            alert('An error occurred while deleting the contact.'); // Show an alert in case of error
        }
        
    };
    
    const handleUpdateClick=(e)=>{
        e.stopPropagation(); 

        navigate('/update',{state:{contact:contact}})
    }

    return (
        <div 
            className="ui item" 
            style={{ 
                maxWidth: '600px', 
                margin: '15px auto', 
                padding: '15px', 
                border: '1px solid #e0e0e0', 
                borderRadius: '10px', 
                backgroundColor: '#f9f9f9', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.2s, box-shadow 0.2s' 
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
        >
            <div className="ui grid" style={{ alignItems: 'center' }}
            >
                <div className="one wide column">
                    <i className="large user circle icon" style={{ color: '#BDBDBD' }}></i>
                </div>
                <div className="twelve wide column" onClick={handleONClick}>
                    <div className="content">
                        <div className="header" style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>{name}</div>
                        <div className="meta" style={{ color: '#777', marginBottom: '5px' }}>
                            <i className="mail icon"></i> {email}
                        </div>
                    </div>
                </div>
                <div className="extra content" style={{ textAlign: 'right' }}>
                    <i className="trash alternate outline icon"
                        style={{ color: '#f2711c', cursor: 'pointer', fontSize: '20px', marginRight:"15px"}}
                        onClick={handleOnDelete}
                    ></i>
                    <i className="edit alternate outline icon"
                        style={{ color: '#f2711c', cursor: 'pointer', fontSize: '20px' }}
                        onClick={handleUpdateClick}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default ContactItem;
