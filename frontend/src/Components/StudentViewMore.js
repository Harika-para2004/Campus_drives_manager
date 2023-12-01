import "./studentviewmore.css"
import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const StudentViewMore = (props) => {
  const location = useLocation();
  const profile = location.state;
    console.log("profile:", profile)

  return (
    <div className="std-vm-page" >
        <div className="left">
          <div className="std-vm-prof1">
            <div>
            {profile.profilePic ? (
              <img src={profile.profilePic} alt={`Profile of ${profile.name}`} />
            ) : (
              <img src="default-image.jpg" alt="Default Profile" />
            )}
            </div>
            <div className="prof-det">
              <h2>{profile.name}</h2>
              <p>{profile.studentId}</p>
              <p><span className="red" >{profile.year} </span>batch</p> 
              <p>CGPA :{profile.grade}</p>           
            </div>
          </div>
        </div>
        <div className="right" >
            <div className="prof-all-det">
              <h2>{profile.name}</h2>
              
              <h4>Personal Info</h4>
              <hr></hr>
              <div className="sub-det">
                <p>ID : {profile.studentId}</p>
                <p>Branch : {profile.branch}</p>
              </div>
              <div className="sub-det">
                <p>Email : {profile.email}</p>
                <p>Batch : {profile.year}</p>
              </div>
              <div className="sub-det">
                <p>Date of Birth : {profile.dob} </p>
                <p>Gender : {profile.gender} </p>
              </div>
              
              <h4>Skills and Preferences</h4>
              <hr></hr>
              <div className="sub-det">
                <p>Skills<hr/> <br/> {profile.skills.map((skill) => (
                <p>{skill.value}</p>
                ))}</p>
                <p>JobPreferences<hr/><br/>{profile.jobPreferences.map((job) => (
                <p>{job.value}</p>
                ))}</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default StudentViewMore