import React from 'react'
import LandingPage from './Landing/LandingPage'
import Loginpage from './Login/Loginpage'
import Navigation from './Navigation/Navigation'
import OurService from './OurService'

const FrontPage = () => {
  return (
    <div style={{ height:'660px' }} >
      <Navigation/>
      <LandingPage/>
      <Loginpage/>
      <OurService/> 
    </div>
  )
}

export default FrontPage