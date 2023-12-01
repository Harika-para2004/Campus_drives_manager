import React, { useState } from 'react';
import './register.css';

function Register({ onClose }) {
    const [idno, setId] = useState(''); 
    const [name, setName] = useState('');    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [person, setPerson] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    

  };

  return (
    <div className="register-form">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
      <div className="form-group">
            
          <select className='selection' id="person" value={person} onChange={(e) => setPerson(e.target.value)} required>
            <option className='select' value="Student">Student</option>
            <option className='select' value="Employer">Employer</option>
          </select>
          </div>

      <div className="form-group">
            
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            
            <label htmlFor="username">Organization:</label>
            <input
              type="text"
              id="idno"
              value={idno}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

        <div className="form-group">

          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">register</button>
        <button onClick={onClose}>Close</button>
        <p>Already have an account please Login</p>
      </form>
      
    </div>
  );
}

export default Register;
