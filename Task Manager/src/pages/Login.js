import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './common.css'

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            navigate('/Home');
        } else {
            alert('Login failed. Wrong details.');
        }
    };

    return (
        <div id='body'>
            <div className="container">
                <h1>Login</h1>
                <hr></hr>
                <form onSubmit={handleLogin} id='loginform'>
                    <div className="log">
                        <label htmlFor="name">Enter your name</label>
                        <input
                            type="name"
                            placeholder="name"
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <label htmlForfor="password">Enter your password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            id='password'
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" id='login'>Login</button>

                        <Link to="/" id="newAccount">Setup New Account</Link>

                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;