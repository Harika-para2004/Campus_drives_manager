import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const JobDriveDetails = (props) => {
  const location = useLocation();
  const jobdrive = location.state;
  const empid =jobdrive.employer;
  
  const id=localStorage.getItem("id");
  const [resultProfile,setResultProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/company-profile/${empid}`);
        setResultProfile(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  },[])

  return (

<div className="std-vm-page" >
<div className="left">
  <div className="std-vm-prof1">
  {resultProfile && resultProfile.map((resultProfile,index)=> (
    <>
    <div>
    {resultProfile.companyLogo ? (
      <img src={resultProfile.companyLogo} alt={`Profile of ${resultProfile.companyName}`} />
    ) : (
      <img src="default-image.jpg" alt="Default Profile" />
    )}
    </div>
    <div className="prof-det">
      <h2> {resultProfile.companyName}</h2>
      <p> Email : {resultProfile.email}</p>
      <p> Location : {resultProfile.location}</p>
      <div className="sub-det">
                <p><span> </span> Contact Info : {resultProfile.contactInfo}</p>
                <p>Website : {resultProfile.website}</p>
    </div>            
    </div>
    </>
  ))}
  </div>
</div>
<div className="right" >
      <h2>Job Drive Details</h2>
      <div className="prof-all-det">
              <h4>Job Details</h4>
              <hr></hr>
              <div className="sub-det">
                <p><span>JobTitle :</span> {jobdrive.jobTitle}</p>
                <p>JobType : {jobdrive.jobType}</p>
              </div>
              <div className="sub-det">
                <p>Location : {jobdrive.jobLocation}</p>
                <p>salaryRange : {jobdrive.salaryRange}</p>
              </div>
              <div className="sub-det">
                <p>companyContact : {jobdrive.companyContact}</p>
              </div>

              <h4>Application Details</h4>
              <hr></hr>
              <div className="sub-det">
                <p>Remote Work : <span>{(jobdrive.remoteWorkOption === "true" ? "Available" : "Not Available")}</span> </p>
                <p>Job Posting Date : {jobdrive.jobPostingDate} </p>
              </div>
              <div className="sub-det">
                <p>Application Deadline : {jobdrive.applicationDeadline} </p>
                <p>Interview Sheduled : {jobdrive.jobExpirationDate} </p>
              </div>
              <div className="sub-det">
                <p>Qualifications : {jobdrive.qualifications}</p>
              </div>
              <div className="sub-det">
                <p>Description : <br/> {jobdrive.jobDescription}</p>
              </div>                       
              
              <h4>Skills and Benifits</h4>
              <hr></hr>
              <div className="sub-det">
                <p>Benefits <hr/> <br/><pre>{jobdrive.benefits}</pre> </p>
                <p>skillsRequired<hr/> <br/> {jobdrive.skillsRequired.map((skill) => (
                <p>{skill.value}</p>
                ))}</p>
              </div>
              <div className="sub-det">              
              </div>
      </div>
</div>
</div>
  )
}

export default JobDriveDetails








  
    /* .std-vm-page{
    display: flex;
    height: 100vh;
    width: 100%;
}
.std-vm-page .left{
    background-color: #003399;
    width: 400px;
}
.std-vm-page .right{
    background-color: aliceblue;
    width: calc(100% - 400px);
}
 */

//  .std-vm-page {
//   display: flex;
//   height: 100vh;
//   width: 1300px;
// }

// .std-vm-page .left {
//   background-color: #003399;
//   width: 400px;
//   padding: 20px; 
//   box-sizing: border-box;
//   background-attachment: fixed; 
// }

// .std-vm-page .right {
//   background-color: aliceblue;
//   flex-grow: 1; 
//   padding: 20px;
//   box-sizing: border-box; 
// }
// .std-vm-prof1{
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }

// .std-vm-prof1 img{
//   border-radius: 50%;
//   width: 250px;
//   margin-bottom: 50px;
// }
// .prof-det{
//   display: flex;
//   flex-direction: column;
//   border: 1px solid white;
//   color:white;
//   padding: 15px;
//   border-radius: 10px;
// }
// .prof-all-det{
//   margin: 30px;
//   border: 2px solid #003399;
//   height: 530px;
// }

// @media (max-width: 768px) {
//   .std-vm-page {
//     flex-direction: column; 
//     width: 680px;
//   }

//   .std-vm-page .left,
//   .std-vm-page .right {
//     width: 100%;
//   }
//   .std-vm-page .left{
//       height: 180px;
//   }
//   .std-vm-prof1{
//     flex-direction: row;
//     margin-top: -10px;
//     align-items: flex-start;
//   }
//   .std-vm-prof1 img{
//     width: 150px;
//     margin-right: 100px;
//   }
//   .prof-all-det{
//   margin: 10px;
//   height: 90%;
//   }
// }
