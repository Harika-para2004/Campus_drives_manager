// import axios from 'axios'
// import {useEffect, useState} from 'react';

// const PostByCompany = () => {

//     const [posts,setPosts] = useState([]);

//     useEffect(() => {
      
//       async function fetchData() {
//         try {
//           const id=localStorage.getItem("id")
//           const response2 = await axios.post('http://localhost:5001/getpostbyid',{id:id});
            
//             setPosts(response2.data.results)
            
//         } catch (error) {
//           alert("error: " + error.message);
//         }
//       }
//       fetchData();
//     }, []);
  
//     return (
//       <div>
//         {posts.map((post) => (
//           <div>
//             <div>{post.jobTitle}</div>
//           </div>
//         ))}
//       </div>
//     );
// }

// export default PostByCompany




import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import rocket from './images/rocket.gif';
import briefcase from './images/briefcase.png'
import marker from './images/marker.png'
import { FaUser } from 'react-icons/fa';
import './getappliedstudents.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const PostByCompany = () => {
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5001/employerposts',{ id: localStorage.getItem("id") } )
      .then((res)=>{
        if(res.data){
          console.log(res.data.results)
          setPosts(res.data.results)
        } else{
          console.log("error")
        }
      })
      .catch((e)=>{alert(e.message)})
  },[posts])

  const handleDeletePost = (postId) => {
    axios.delete(`http://localhost:5001/employerposts/${postId}`)
    .then(response => {
      console.log(response.data);
      setPosts(posts.filter(post => post._id !== postId));
    })
    .catch(error => {
      alert("error frontend");
    });
  }

  return (
    <div className='mainCont jobdrive-page'>
    <nav className="navbar navbar-expand-lg nav-cp">
      <div className="container-fluid ">
        <span className="navbar-brand wh me-lg-0">Career Blend</span>
        <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse nav-right" id="navbarText">
          <ul className="navbar-nav fw-bold nav-ul">
            <li className="nav-item active text-decoration-none">
              <Link to="/employer" className="nav-link active text-white" aria-current="page">Home</Link>
            </li>
          </ul>
          <span className="navbar-text text-white">
          <Link to="/companyProfile" ><FaUser size={32} className='user-icon' /></Link>            
          </span>
        </div>
      </div>
    </nav>
    <div className='jobdrive-card'>
    <h1 className='jd-head'>Job Drives</h1>
    <ul className='jd-ul'>
      {posts.length !== 0 ?  posts.map((jobdrive) => (
          <div>
          <li className='jd-li' key={jobdrive._id}>
                 <div className='img-bg'>
                      <img className='jd-img' src={rocket} alt="" />
                      <h1 class="jd-head">{jobdrive.jobTitle}</h1>
                  </div>
                 <div class="job-details">
                    <div class="job-info">
                        <p><span><img className='jd-icon' width="23px" src={briefcase} alt="" /><strong>Job Type:</strong></span> 
                        {jobdrive.jobType}</p>
                        <p><span><img className='jd-icon' width="23px" src={marker} alt="" /><strong>Location:</strong></span>
                        {jobdrive.jobLocation}</p>
                    </div>
                    <div class="job-info">
                        <p><strong>Salary Range:</strong> {jobdrive.salaryRange}</p>
                        {/* <p><img className='jd-icon' width="38px" src={expired} alt="" /><strong>Application Deadline:</strong> {jobdrive.applicationDeadline}</p> */}
                        <p><strong>Open Positions:</strong> {jobdrive.openPositions}</p>
                    </div>
                    <div className='job-info' >
                      <button className='jd-btn'><Link to="/jobDriveDetails" className="text-white text-decoration-none" state={jobdrive}>View More</Link> </button>
                      <button onClick={() => handleDeletePost(jobdrive._id)} className='jd-btn'>Delete </button>
                    </div>
                </div>
          </li>
        </div>
      )) : <p className='no-output'>No Posts Yet</p>}
    </ul>
  </div>
  </div>
  )
}
export default PostByCompany








// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import rocket from './images/rocket.gif';
// import briefcase from './images/briefcase.png'
// import marker from './images/marker.png'
// import { FaUser } from 'react-icons/fa';
// import './getappliedstudents.css'

// const GetAppliedStudents = () => {
//   const [posts,setPosts] = useState([]);

//   useEffect(() => {
//     axios.post('http://localhost:5001/employerposts',{ id: localStorage.getItem("id") } )
//       .then((res)=>{
//         if(res.data){
//           console.log(res.data.results)
//           setPosts(res.data.results)
//         } else{
//           console.log("error")
//         }
//       })
//       .catch((e)=>{alert(e.message)})
//   },[posts])

//   const handleDeletePost = (postId) => {
//     axios.delete(`http://localhost:5001/employerposts/${postId}`)
//     .then(response => {
//       console.log(response.data);
//       setPosts(posts.filter(post => post._id !== postId));
//     })
//     .catch(error => {
//       alert("error frontend");
//     });
//   }

//   return (
//     <div className='mainCont jobdrive-page'>
//     <nav className="navbar navbar-expand-lg nav-cp">
//       <div className="container-fluid ">
//         <span className="navbar-brand wh me-lg-0">Career Blend</span>
//         <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon "></span>
//         </button>
//         <div className="collapse navbar-collapse nav-right" id="navbarText">
//           <ul className="navbar-nav fw-bold nav-ul">
//             <li className="nav-item active text-decoration-none">
//               <Link to="/employer" className="nav-link active text-white" aria-current="page">Home</Link>
//             </li>
//           </ul>
//           <span className="navbar-text text-white">
//           <Link to="/companyProfile" ><FaUser size={32} className='user-icon' /></Link>            
//           </span>
//         </div>
//       </div>
//     </nav>
//     <div className='jobdrive-card'>
//     <h1 className='jd-head'>Job Drives</h1>
//     <ul className='jd-ul'>
//       {posts.length !== 0 ?  posts.map((jobdrive) => (
//           <div>
//           <li className='jd-li' key={jobdrive._id}>
//                  <div className='img-bg'>
//                       <img className='jd-img' src={rocket} alt="" />
//                       <h1 class="jd-head">{jobdrive.jobTitle}</h1>
//                   </div>
//                  <div class="job-details">
//                     <div class="job-info">
//                         <p><span><img className='jd-icon' width="23px" src={briefcase} alt="" /><strong>Job Type:</strong></span> 
//                         {jobdrive.jobType}</p>
//                         <p><span><img className='jd-icon' width="23px" src={marker} alt="" /><strong>Location:</strong></span>
//                         {jobdrive.jobLocation}</p>
//                     </div>
//                     <div class="job-info">
//                         <p><strong>Salary Range:</strong> {jobdrive.salaryRange}</p>
//                         {/* <p><img className='jd-icon' width="38px" src={expired} alt="" /><strong>Application Deadline:</strong> {jobdrive.applicationDeadline}</p> */}
//                         <p><strong>Open Positions:</strong> {jobdrive.openPositions}</p>
//                     </div>
//                     <div className='job-info' >
//                       <button className='jd-btn'><Link to="/jobDriveDetails" state={jobdrive}>View More</Link> </button>
//                       <button onClick={() => handleDeletePost(jobdrive._id)} className='jd-btn'>Delete </button>
//                     </div>
//                 </div>
//           </li>
//         </div>
//       )) : <p className='no-output'>No Posts Yet</p>}
//     </ul>
//   </div>
//   </div>
//   )
// }
// export default GetAppliedStudents

