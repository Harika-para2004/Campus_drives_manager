import React, { useState } from 'react';
import './Navigation.css'; 
import mylogoFix from '../images/mylogo2.png';
import { Link } from 'react-router-dom';
import handshake from '../images/handshake.gif'
import Loginpage from '../Login/Loginpage';

function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  // const scrollToLoginPage = () => {
  //   const loginPageElement = document.getElementById('loginPage');
  //   loginPageElement.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <div className='home-navbar' >
        <div className='logo-cont'>
          <img className='logo' src={mylogoFix} alt="logo"/>
        </div>

        {/* <div className="navigation">
          <ul>
            <li className={`list ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(0)}>
              <span className='nav-a'>
                <span className="icon"><ion-icon name="home"></ion-icon></span>
                <span className="text">Home</span>
              </span>
            </li>
            <li className={`list ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
              <span className='nav-a'>
                <span className="icon"><ion-icon name="image"></ion-icon></span>
                <span className="text">Profile</span>
              </span>
            </li>
            <li className={`list ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleItemClick(3)}>
              <span className='nav-a'>
                <span className="icon"><ion-icon name="information-circle"></ion-icon></span>
                <span className="text">Details</span>
              </span>
            </li>
            <li className={`list ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleItemClick(4)}>
              <span className='nav-a'>
                <span className="icon"> <ion-icon name="information-circle"></ion-icon></span>
                <span className="text">About </span>
              </span>
            </li>
            <li className={`list ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(2)}>
              <span className='nav-a'>
                <span className="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
                <span className="text">Help</span>
              </span>
            </li>
            <div className="indicator"></div>
          </ul>
        </div> */}

        <div className="navigation">
          <ul>
            <li>HOME</li>
            <Link to="/contact"><li>CONTACT US</li></Link>
          </ul>
        </div>
    </div>
  );
}

export default Navigation;







































// import React, { Component } from 'react';
// import './Navigation.css'; // Import your CSS file

// class Navigation extends Component {
//   constructor() {
//     super();
//     this.state = {
//       activeIndex: 0,
//     };
//   }

//   handleItemClick(index) {
//     this.setState({ activeIndex: index });
//   }

//   render() {
//     const { activeIndex } = this.state;

//     return (
      
      

//         <div className="navigation">
//         <ul>
//           <li className={`list ${activeIndex === 0 ? 'active' : ''}`} onClick={() => this.handleItemClick(0)} >
//             <a href="#">
//               <span className="icon"><ion-icon name="home"></ion-icon></span>
//               <span className="text">Home</span>
//             </a>
//           </li>
//           <li className={`list ${activeIndex === 1 ? 'active' : ''}`} onClick={() => this.handleItemClick(1)}>
//             <a href="#">
//               <span className="icon"><ion-icon name="image"></ion-icon></span>
//               <span className="text">Profile</span>
//             </a>
//           </li>
//           <li className={`list ${activeIndex === 2 ? 'active' : ''}`} onClick={() => this.handleItemClick(2)}>
//             <a href="#">
//               <span className="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
//               <span className="text">Messages</span>
//             </a>
//           </li>
//           <li className={`list ${activeIndex === 3 ? 'active' : ''}`} onClick={() => this.handleItemClick(3)}>
//             <a href="#">
//               <span className="icon"><ion-icon name="information-circle"></ion-icon></span>
//               <span className="text">Details</span>
//             </a>
//           </li>
//           <li className={`list ${activeIndex === 4 ? 'active' : ''}`} onClick={() => this.handleItemClick(4)}>
//             <a href="#">
//               <span className="icon"><ion-icon name="notifications-outline"></ion-icon></span>
//               <span className="text">Notifications</span>
//             </a>
//           </li>
//           <div className="indicator"></div>
//         </ul>
        
//         {/* <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
//         <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> */}
//       </div>

//       </nav>
//     );
//   }
// }

// export default Navigation;
//