import React, { useState } from 'react';
import './RegisterForm.css'
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function RegistrationForm({loginType}) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showSignup,setShowSignup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5001/register', {name, email, password, role})
    .then(res => {
        if(res.data === "success"){
            alert("user created")
        }
        else{
            alert("please check your email and password again")
        }
    }).catch(err => console.log(err))
  };

  const closeRegistrationForm = () => {
    setShowSignup(false);
  };

  return (
     showSignup && (
    <div className="reg-form-main-cont" >
        <div className='blur-bg-overlay show-popup'></div> 
        <div className='form-popup show-popup'>
        <span className='close-btn'><FaTimes onClick={closeRegistrationForm} /></span>
        <div className='form-box'>
          <div className='form-details'>
            {/* <h2>Register Here</h2> */}
          </div>
          <div className='form-content'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
        <div className="main-user-info">
            <div className="user-input-box">
                <label htmlFor="name">NAME</label>
                <input 
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter userName"
                onChange = {(e) => setName(e.target.value)}
                required/>
            </div>
            <div className="user-input-box">
                <label htmlFor="email"> Email</label>
                <input 
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </div>
            <div className="user-input-box">
                <label htmlFor="password">Password</label>
                <input 
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </div>
            <div className="user-input-box">
                <label htmlFor="role">Select Role</label>
                <select name="role"
                onChange={(e) => setRole(e.target.value)}
                required>
                    <option>Select</option>
                    <option value="student">Student</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>
        <div className="form-submit-btn">
            <input type="submit" value="Register"  />
        </div>
    </form>
          </div>
        </div>
        </div>
    </div>
    )
);
}

export default RegistrationForm;
