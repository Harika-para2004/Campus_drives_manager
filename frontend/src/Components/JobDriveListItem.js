import React from 'react'
import { Link } from 'react-router-dom';
import rocket from './images/rocket.gif';
import briefcase from './images/briefcase.png'
import marker from './images/marker.png'
import expired from './images/expired.gif'
import 'bootstrap/dist/css/bootstrap.min.css';

const JobDriveListItem = ({ jobdrive, appliedStatus, handleApply }) => {
  return (
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
                <button className='jd-btn'> <Link to="/jobDriveDetails" className="text-white text-decoration-none" state={jobdrive}> View More </Link> </button>
                  {(appliedStatus[jobdrive._id] === "applied") ? (
                    <button className='jd-btn' disabled>Applied</button>
                    ) : (
                      <button className='jd-btn' onClick={() => handleApply(jobdrive)}>Apply</button>
                  )}
                </div>
            </div>
            </li>
  )
}

export default JobDriveListItem