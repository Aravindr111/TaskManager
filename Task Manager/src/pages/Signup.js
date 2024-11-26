import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './common.css'


const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/Signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }),
        });
    
        if (response.ok) {
          navigate('/Home');
        } else {
          alert('Signup failed.');
        }
      };
      return (
        <div id='body'>
        <div className='container'>
          <h1>Signup</h1>
          <form onSubmit={handleSignup}>
          <label htmlFor="name">Enter your name</label>
            <input
              type="name"
              placeholder="name"
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              placeholder="Password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id='login'>Signup</button>
            <Link to="/Login" id="newAccount">Already have an account!</Link>
          </form>
        </div>
        </div>
      );
    };
    
    export default Signup;
    