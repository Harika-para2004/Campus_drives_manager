import 'bootstrap/dist/css/bootstrap.min.css';
import './employer.css'
import { Link } from 'react-router-dom';
import lookingjob from './images/lookingjob.jpg';
import people from './images/people.jpg'
import stuProf from './images/stu-prof.jpg';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import std2 from './images/std2.jpg'
import mylogoFix from './images/mylogo2.png';

const Student = () => {

  const [profiles, setProfiles] = useState('');

  useEffect(() => {
      axios.get('http://localhost/user/emp')
      .then(()=>{})
      .catch(()=>{})
      
      axios.get('http://localhost:5001/get-students')
      .then((res) => {
        console.log(res)
        console.log(res.data.data)
          setProfiles(res.data.data);
      })
      .catch((e) => {
          console.log(e)
      })
  },[])

  return (
    <div className='main-emp'>
        <div class="area" >
              <ul class="circles">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
              </ul>
        </div>

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid ">
            <span className="navbar-brand wh me-lg-0">
              <div className='logo-cont'>
              <img className='logo' src={mylogoFix} alt="logo"/>
              </div>
            </span>
            <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse stdnav-right" id="navbarText">
              <ul className="navbar-nav fw-bold nav-ul">
                <li className="nav-item active text-decoration-none">
                  <span className="nav-link active text-white" aria-current="page">Home</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    <Link to="/applications" className="text-white text-decoration-none">Logout</Link>
                  </span>
                </li>
                {/* <li className="nav-item">
                  <span className="nav-link text-white text-decoration-none" href="#">Pricing</span>
                </li> */}
              </ul>
              <span className="navbar-text text-white">
              <Link to="/studentprofiles" ><FaUser size={32} className='user-icon' /></Link>            
              </span>
            </div>
          </div>
        </nav>

        <div className='cards-emp'>
          <div className='post-cont'>
          <img className='jobpost' src={people} alt='' />
          <div className="row">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> Explore Placement Drives</h5>
                  <p className="card-text">
                  Embark on a transformative journey towards your dream career through our exclusive Placement Drives. </p>
                  <span className="btn " style={{ backgroundColor:"#003399",fontWeight :"bold" }} >
                    <Link to={'/displaydrives'} className='text-white  text-decoration-none'>
                      ALL DRIVES
                    </Link>
                  </span>
                </div>
            </div>
            </div>
            </div>
            <div className='post-cont'>
            <img className='jobpost' src={std2} alt='' />
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Explore Profiles Seamlessly</h5>
                  <p className="card-text"> Uncover a wealth of insights as you navigate through detailed profiles, gaining a comprehensive understanding of individuals.</p>
                  <span className="btn" style={{ backgroundColor:"#003399", fontWeight :"bold" }} >
                    {/* <Link to={`/getstudents/${profiles}`} className='text-white text-decoration-none'>
                      View Profiles
                    </Link> */}
                    <Link to='/getstudents' state={ profiles } className='text-white text-decoration-none' >
                      View Profiles
                    </Link>
                  </span>
                </div>
              </div>
          </div>
        </div>  
    </div>
  
  )
}

export default Student
