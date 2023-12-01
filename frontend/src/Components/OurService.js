import React from 'react'
import './ourservice.css'
// import legalservices from './images/legal-services.png'
import jobsearch from './images/job-search.png'
import hiring from './images/hiring.png'
import onlinediscussion from './images/online-discussion.png'

const OurService = () => {
  return (
    <div className="service-section">
        <div className="title">
            <h1>Our Services</h1>
        </div>
        <div className="services">
            <div className="card">
                <div className="icon">
                    <img width="180px" alt="img" src={onlinediscussion} />
                </div>
                <h2>Connection with Employers</h2>
                <p> Ensure that students have access to comprehensive information about upcoming placement drives.
                Facilitate direct connections with employers to streamline the application and recruitment process.
                </p>
            </div>
            <div className="card">
                <div className="icon">
                    <img src={jobsearch} width="180px" alt="img" />
                </div>
                <h2>Student Awareness of Drives</h2>
                <p> Implement strategies to maximize student awareness of placement drives within the college.
                Foster a proactive approach to career opportunities through targeted campaigns and engagement activities.
                </p>
            </div>
            <div className="card">
                <div className="icon">
                    <img src={hiring} width="180px" alt="img" />
                </div>
                <h2>Centralized Management of Drives</h2>
                <p>Efficiently manage and coordinate all placement drives through a centralized platform,
                ensuring smooth execution and providing valuable insights for future improvements.Optimize resource allocation and planning.
                </p>
            </div>
        </div>
    </div>  
  )
}

export default OurService