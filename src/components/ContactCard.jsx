import React from 'react';
import { useLocation ,Link} from 'react-router-dom';

const ContactCard = () => {
    const location =useLocation();

    const {contact}=location.state||{}
    const {name,email,phone,address}=contact||{};

    return (
        <div className="ui container" style={{ height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="ui card" style={{ width: '400px', border: '1px solid black', borderRadius: '8px', padding: '10px' }}>
                <div className="content">
                    <div className="header" style={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                        {name}
                    </div>
                    <div className="meta" style={{ color: '#777', marginBottom: '5px' }}>
                        <i className="phone icon"></i> {phone}
                    </div>
                    <div className="meta" style={{ color: '#777', marginBottom: '5px' }}>
                        <i className="mail icon"></i> {email}
                    </div>
                    <div className="meta" style={{ color: '#777' }}>
                        <i className="home icon"></i> {address}
                    </div>
                </div>
            </div>
            <Link to="/"><button 
                style={{ 
                    marginTop: '20px', 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    backgroundColor: '#007bff', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                }} 
            >
                Back
            </button></Link>
        </div>
    );
};

export default ContactCard;


