import React from 'react'
import landingImg3 from '../images/landingImg3.png';

const LandingHome = () => {
  return (
    <div className="main-cont">
    <div className="main-head">
      <h1 className="head">
        Unlock Opportunities:<br />
        <span style={{ color: '#008080', fontSize: '45px' }}>Recruit Your Future</span>
      </h1>
      <div>
      </div>
    </div>
    <div>
      <img className="landing-img" src={landingImg3} alt="hiring img" />
    </div>
  </div>
  )
}

export default LandingHome