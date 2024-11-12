import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios'; 
import { Form, Button, Header,Container } from 'semantic-ui-react';

const SignUp = () => {
    const navigate = useNavigate();
    const email = useRef('');
    const password = useRef('');
    const username = useRef('');

    const handleOnSubmit = async (e) => {
        e.preventDefault(); 

        if (!email.current.value || !password.current.value || !username.current.value) {
            return alert("All fields are required");
        }

        const user = {
            email: email.current.value,
            password: password.current.value,
            username: username.current.value
        };

        console.log(user);

        try {
            const response = await axios.post('http://localhost:3000/users/signup',
                { user },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                email.current.value = '';
                password.current.value = '';
                username.current.value = '';
                navigate('/login');
            } else {
                console.log("Sign-up failed");
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data || 'An error occurred');
        }
    };

    return (
        <><h2 as="h2" style={{
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '10px', 
            color: '#333'
          }}> Sign-up..
          </h2>  
        <div className="ui container" style={{ height: '45vh',margin:'30px',display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'5px'}}>
            <form className="ui form" onSubmit={handleOnSubmit} style={{ width: '400px', border: '1px solid black', borderRadius: '8px', padding: '20px' }}>
                <div className="field">
                    <label>Username</label>
                    <input type="text" ref={username} placeholder="Enter your username" required />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" ref={email} placeholder="Enter your email" required />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" ref={password} placeholder="Enter your password" required />
                </div>
                <button className="ui primary button" type="submit">Sign-Up</button>
                <p style={{ marginTop: '10px' }}>If you have an account</p>
                <Link to='/login'>
                    <button className="ui button">login</button>
                </Link>
            </form>
        </div>
        </>
    );
};

export default SignUp;
