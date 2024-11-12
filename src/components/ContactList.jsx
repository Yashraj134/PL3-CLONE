import React from 'react';
import ContactItem from './ContactItem'; 
import { useContext } from 'react';
import { ContactContext } from '../context/Contact';
import { Search } from './Search';
const ContactList = () => {
    const {filetredContacts,contacts}=useContext(ContactContext)

    const token=localStorage.getItem('token')
    if(!token){
        return <h2 as="h2" style={{
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '5px', 
            color: '#333'
          }}> Login..
          </h2>  
      }
    return (
        <>
            <Search></Search>
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px', color: '#333' }}>
                Contact List
            </h2>

            <div className="ui relaxed divided list">
                {
                    filetredContacts.length > 0 ? (
                        filetredContacts.map((contact, index) => (
                            <ContactItem  contact={contact} key={index} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#888' }}>No contacts available</p>
                    )
                }
            </div>
        </div>
        </>
    );
};

export default ContactList;
