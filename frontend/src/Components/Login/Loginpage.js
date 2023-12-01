import React, { useState } from 'react';
import './Loginpage.css'
import img3 from '../images/img3.avif'
import { FaTimes } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegistrationForm from '../Register/RegisterForm';
import { Link } from 'react-router-dom';

function Loginpage() {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [logintype ,setLogintype] = useState('');

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
  };

  const handleLogin = (loginType) => {
    setLogintype(loginType);
  }



  return (
    <div className="login-main">        
    <h1>Login Page</h1>
    <hr/>
    <div className="login-cont">
      <div className='img-container'>
      <img src={img3} alt="img" />
        <div className='content-overlay'>
            <h3>Choose what you are Company,Student,Admin</h3>
            <div className="option1">
            <button onClick={() => handleLogin("login")}>LogIn</button>
            </div>
            <div className="option2">
            <button onClick={() => handleLogin("companySignup")}>Register</button>
            </div>
            <p></p>
        </div>
      </div>

      <div className="login-container">
        {/* Left Circular Div (Company) */}
        <div className='classes'>
        <div
          className={`circle company ${selectedUserType === 'company' ? 'selected' : ''}`}
          onClick={() => handleUserTypeSelection('company')}
        >
          Company
          {/* {selectedUserType === 'company' && (
            <div className="options">
            <button onClick={() => handleLogin("login")}>Sign In</button>
            <button onClick={() => handleLogin("companySignup")}>Sign Up</button>
          </div>
          )} */}
        </div>

        {/* Right Circular Div (Student) */}
        <div
          className={`circle student ${selectedUserType === 'student' ? 'selected' : ''}`}
          onClick={() => handleUserTypeSelection('student')}
        >
          Student
          {/* {selectedUserType === 'student' && (
            
          )} */}
        </div>

        {/* Bottom Circular Div (Admin) */}
        <div
          className={`circle admin ${selectedUserType === 'admin' ? 'selected' : ''}`}
          onClick={() => handleUserTypeSelection('admin')}
        >
          Admin
          {/* {selectedUserType === 'admin' && (
            <div className="options">
              <button onClick={() => handleLogin("login")}>Sign In</button>
            </div>
          )} */}
        </div>
        </div>
      

        {
          logintype === "login" && (
            <LoginForm />
          )
        }
        {
          logintype === "studentSignup" && (
            <div>
              <div className='blur-bg-overlay show-popup'></div> 
              <div className='form-popup show-popup'>
              <span className='close-btn'><FaTimes onClick={() => handleLogin("")} /></span>
              <div className='form-box'>
                <div className='form-details'>
                  <h2>Welcome Back</h2>
                  <p>Please log in using your personal information to stay connected with us.</p>
                </div>
                <div className='form-content'>
                  <h2>LOGIN</h2>
                  <form >
                    <div className='input-field'>
                      <input type='email' required/>
                      <label>Email</label>
                    </div>
                    <div className='input-field'>
                      <input type='password' required/>
                      <label>Password</label>
                    </div>
                    <div className='bottom-link'>
                      Don't have an account ?<p>Register</p>
                    </div>

                  </form>
                </div>
              </div>
          </div>
          </div>
          )}
 
          {
            logintype ==="companySignup" && <RegistrationForm loginType={logintype} />
          }

      </div>
    </div>
    </div>
  );
}

export default Loginpage;


