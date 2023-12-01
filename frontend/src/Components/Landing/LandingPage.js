

import React, { useState } from 'react';
import './landingPage.css';
import Navigation from '../Navigation/Navigation';
import landingImg3 from '../images/landingImg3.png';


function LandingPage() {
 // const [showLoginForm, setShowLoginForm] = useState(false);
 // const [showRegisterForm, setShowRegisterForm] = useState(false);

  // const handleLoginClick = () => {
  //   setShowLoginForm(true);
  // };

  // const handleCloseLoginForm = () => {
  //   setShowLoginForm(false);
  // };

  // const handleRegister = () => {
  //   setShowRegisterForm(true)
  // }

  // const handleCloseRegister = () => {
  //   setShowRegisterForm(false)
 // }

  return (
    <div>
      <div className="landing-main-cont">
        <div className="main-head">
          <h1 className="head">
            Unlock Opportunities:<br />
            <span style={{ color: '#008080', fontSize: '45px' }} >Recruit Your Future </span>
          </h1>
          <div>
          </div>
        </div>
        <div>
          <img className="landing-img" src={landingImg3} alt="hiring img" />
        </div>
      </div>      
    </div>
  );
}

export default LandingPage;










      // {/* Conditionally render the LoginForm */}
      // {showLoginForm && <LoginForm onClose={handleCloseLoginForm} />}
      // {showRegisterForm && <Register onClose={handleCloseRegister} />}