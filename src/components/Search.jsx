import React, { useContext, useRef,useEffect, useState } from 'react';
import { ContactContext } from '../context/Contact';
export  const Search=()=>{
    const [name,setName]=useState('')

    const {filterContacts}=useContext(ContactContext);
    
    useEffect(()=>{
        filterContacts(name);
    },[name])

    return(<>
         <div className="ui middle aligned center aligned grid" style={{ height: '20vh' }}>
      <div className="column" style={{ maxWidth: '450px' }}>
        <div className="field" style={{ position: 'relative', width: '100%' }}>
          <label htmlFor="email" style={{ marginBottom: '10px', display: 'block', fontWeight: 'bold', color: '#333' }}>Name</label>
          <input 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            name="name" 
            placeholder="Enter your name" 
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '50px',  
              border: '1px solid #ccc',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  
    </>)
}