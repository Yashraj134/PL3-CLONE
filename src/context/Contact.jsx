import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

// Create the Contact Context
export const ContactContext = createContext();

// Create the Provider component
export const ContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch contacts from the API when the component is mounted
    // useEffect(() => {
    //     const fetchContacts = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/contacts', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             setContacts(response.data.rows);
    //         } catch (error) {
    //             console.error('Error fetching contacts:', error);
    //         }
    //     };

    //     fetchContacts();
    // }, [token]); // Add token as dependency

    // Add a new contact
    

    const [filetredContacts,setFilterContacts]=useState(contacts);

    useEffect(()=>{
        setFilterContacts(contacts)
    },[contacts])

    const filterContacts = (name) => {
        const newContacts = contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(name.toLowerCase());
        });
    
        setFilterContacts(newContacts);
    };
    

    const addContact = (contact) => {
        setContacts((prevContacts) => Array.isArray(prevContacts) ? [...prevContacts, contact] : [contact]);
    };

    const addContacts=(contacts)=>{
        setContacts(contacts);
    }

    // Delete a contact by ID
    const deleteContact = (contactId) => {
        const newContacts = contacts.filter((contact) => contact.contactId !== contactId);
        setContacts(newContacts);
    };

    // Update a contact by ID
    const updateContact = (contactId, updatedContact) => {
        const newContacts = contacts.map((contact) => 
            contact.contactId === contactId ? updatedContact : contact
        );
        setContacts(newContacts);
    };

    return (
        <ContactContext.Provider value={{ filetredContacts,contacts, filterContacts,addContacts,addContact, deleteContact, updateContact }}>
            {children}
        </ContactContext.Provider>
    );
};
