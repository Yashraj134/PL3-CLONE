import { useState,useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Login from './Login';
import SignUp from './SingUp';
import ContactCard from './ContactCard';
import Header from './Header';
import UpdateForm from './UpdateForm';
import axios from 'axios';
import { ContactContext, ContextProvider } from '../context/Contact';

function App() {
  // const [contacts, setContacts] = useState([]);
  // const token=localStorage.getItem('token')
  // useEffect(() => {
  //     const fetchContacts = async () => {
  //         try {
  //             const response = await axios.get('http://localhost:3000/contacts',
  //               {
  //                 headers: {
  //                   'Authorization': `Bearer ${token}`,
  //                   'Content-Type':'application/json'
  //                 }
  //               }
  //             );
  //             setContacts(response.data.rows);
  //         } catch (error) {
  //             console.error("Error fetching contacts:", error);
  //         }
  //     };

  //     fetchContacts();
  // }, []);

  // const addContact = (contact) => {
  //   setContacts(prevContacts => Array.isArray(prevContacts) ? [...prevContacts, contact] : [contact]);
  // };

  // const deleteContact=(contactId)=>{
  //   const newContacts=contacts.filter((contact)=>{
  //     return contactId!==contact.contactId;
  //   })

  //   setContacts(newContacts);
  // }

  // const updateContact=(contactId,contact)=>{
  //   const newContacts=contacts.filter((contact)=>{
  //     return contactId!==contact.contactId;
  //   })

  //   setContacts([...newContacts,contact]);
  // }

    const {addContacts}=useContext(ContactContext)
    const token =localStorage.getItem('token')
    useEffect(() => {
        const fetchContacts = async () => {
            try {
               console.log(token)
                const response = await axios.get('http://localhost:3000/contacts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                addContacts(response.data.rows);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, [token]); 

  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<ContactForm/>}
          />
          <Route
            path="/"
            element={<ContactList/>}
          />
          <Route
            path="/contact/:id"
            element={<ContactCard />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/update"
            element={<UpdateForm/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
