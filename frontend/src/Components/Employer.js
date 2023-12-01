import 'bootstrap/dist/css/bootstrap.min.css';
import './employer.css'
import jobapply from './images/job-apply2.jpg'
import stuProf from './images/stu-prof.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mylogoFix from './images/mylogo2.png';

const Employer = () => {

  const [profiles, setProfiles] = useState('');
  const history = useNavigate();

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


  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/'); 
  };

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
          <div className="collapse navbar-collapse empnav-right" id="navbarText">
            <ul className="navbar-nav fw-bold nav-ul">
              <li className="nav-item active text-decoration-none">
                <span className="nav-link active text-white" aria-current="page">Home</span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-white">
                  <Link to="/getpost-by-id" className="text-white text-decoration-none">Posts</Link>
                </span>
              </li>
            </ul>
            <span className="navbar-text text-white">
            <Link to="/companyProfile" ><FaUser size={32} className='user-icon' /></Link>            
            </span>
          </div>
        </div>
      </nav>

      <div className='cards-emp'>
        <div className='post-cont'>
        <img className='jobpost' src={jobapply} alt='' />
        <div className="row">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Posting Job Details</h5>
                <p className="card-text">Share details about your posting job opportunity.Provide comprehensive information
          to attract potential candidates.</p>
                <span className="btn " style={{ backgroundColor:"#003399",fontWeight :"bold" }} >
                  <Link to={'/createpost'} className='text-white  text-decoration-none'>
                    CREATE A POST
                  </Link>
                </span>
              </div>
          </div>
          </div>
        </div>
        <div className='post-cont'>
          <img className='jobpost' src={stuProf} alt='' />
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Applicant Overview</h5>
                <p className="card-text">Explore the students who have applied and for the position. This assist you in making well-informed decisions for potential candidates.
</p>
                <span className="btn" style={{ backgroundColor:"#003399", fontWeight :"bold" }} >
                  {/* <Link to={`/getstudents/${profiles}`} className='text-white text-decoration-none'>
                    View Profiles
                  </Link> */}
                  <Link to='/getappliedstudents' state={ profiles } className='text-white text-decoration-none' >
                    VIEW APPLIED STUDENTS
                  </Link>
                </span>
              </div>
            </div>
        </div>
      </div>  
    </div>
  )
}

export default Employer
