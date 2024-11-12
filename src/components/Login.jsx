import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const email = useRef('');
    const password = useRef('');

    const handleOnSubmit = async (e) => {
        e.preventDefault(); 

        if (!email.current.value || !password.current.value) {
            return alert("All fields are required");
        }

        const user = {
            email: email.current.value,
            password: password.current.value
        };

        try {
            const response = await axios.post('http://localhost:3000/users/login',
                {user},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                navigate('/add');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data || 'An error occurred');
        }
    };

    return (
        <>         
        <h2 as="h2" style={{
          textAlign: 'center', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '5px', 
          color: '#333'
        }}> Login..
        </h2>    
        <div className="ui container" style={{ height: '35vh',margin:'30px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
            <form className="ui form" onSubmit={handleOnSubmit} style={{ width: '400px', border: '1px solid black', borderRadius: '8px', padding: '20px' }}> 
                <div className="field">
                    <label>Email</label>
                    <input type="email" ref={email} placeholder="Enter your email" required />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" ref={password} placeholder="Enter your password" required />
                </div>
                <button className="ui primary button" type="submit">Login</button>
                <p style={{ marginTop: '10px' }}>If you don't have an account</p>
                <Link to='/signup'>
                    <button className="ui button">Sign Up</button>
                </Link>
            </form>
        </div>
</>
    );
};

export default Login;
