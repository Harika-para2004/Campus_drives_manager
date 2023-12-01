import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from 'axios';
import Select from 'react-select'
import './createpost.css'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BiBriefcase, BiAlarm, BiCurrentLocation, BiCard, BiCheckDouble, BiPuzzle, BiRupee, BiCalendar } from 'react-icons/bi';

const CreatePost = () => {
    // const id = localStorage.getItem("id")
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobType: "Full-time",
        jobLocation: "",
        jobDescription: "",
        qualifications: "",
        skillsRequired: [],
        salaryRange: "",
        applicationDeadline: "",
        //applicationInstructions: "",
        jobPostingDate: "",
        jobExpirationDate: "",
        openPositions: 1,
        companyContact: "",
        benefits: "",
        remoteWorkOption: false,
      });

      const handleSkillsChange = (selectedOptions) => {
        setFormData({
          ...formData,
          skillsRequired: selectedOptions,
        });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            axios.post('http://localhost:5001/job-posts', {formData:formData,id:localStorage.getItem("id")})
            .then((response) => {
                if(response.data === "success"){
                    console.log("successfully saved")
                    alert("successfully saved");
                }
                else{
                    alert("fill all the required fields");
                }
            })
            .catch((error) => {
                alert("error occured please try again")
                console.log(error)
            })
      }

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? checked : value
        }));
      };

  return (
    <div className='mainCont'>
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
        <div className='cp-form'>
        <h2 className='cp-head'>CreatePost</h2>
        <div className='form-cont'>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="mb-3">
                    <label className="form-label"> <BiBriefcase/> Job Title</label>
                    <input 
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        type="text"
                        name="jobTitle" className="form-control" placeholder="Job Title" required />
                </div>
                <div className="mb-3">
                        <label htmlFor='jobType' className="form-label"> <BiAlarm/> Job Type:</label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                </div>
                <div className="mb-3">
                    <label className="form-label"><BiCurrentLocation/> Job Location:</label>
                    <input type="text" name="jobLocation" 
                    value={formData.jobLocation}
                    onChange={handleInputChange} 
                    className="form-control" 
                    placeholder="Job Location"
                    required />
                </div>                           
                <div className="mb-3">
                    <label className="form-label"><BiCard/> Job Description:</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        className="form-control"
                        onChange={handleInputChange}
                        placeholder="Job Description"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><BiCheckDouble/> Qualifications:</label>
                    <textarea
                        id="qualifications"
                        name="qualifications"
                        className="form-control" 
                        placeholder="Enter Required Qualifications" 
                        value={formData.qualifications}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Skills Required:</label>
                    <Select
                    isMulti
                    name="skillsRequired"
                    options={[
                        { label: "HTML CSS", value: "HTML CSS" },
                        { label: "JavaScript", value: "JavaScript" },
                        { label: "React", value: "React" },
                        { label: "Node.js", value: "Node.js" },
                        { label: "Java", value: "Java" },
                        { label: "Python", value: "Python" },
                        { label: "ML", value: "ML" },
                    ]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formData.skillsRequired}
                    onChange={ handleSkillsChange }
                />
                </div>
                <div className="mb-3">
                    <label className="form-label"><BiRupee/> Salary Range:</label>
                    <input
                        type="number"
                        id="salaryRange"
                        name="salaryRange"
                        className="form-control" 
                        placeholder="Enter Salary Range"
                        value={formData.salaryRange}
                        onChange={handleInputChange}
                    />                
                </div>
                <div className="mb-3">
                    <label className="form-label"><BiCalendar/> Application Deadline:</label>
                    <input
                        type="date"
                        id="applicationDeadline"
                        name="applicationDeadline"
                        className="form-control" 
                        placeholder=""
                        value={formData.applicationDeadline}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Posting Date:</label>
                    <input
                        type="date"
                        id="jobPostingDate"
                        name="jobPostingDate"
                        className="form-control" 
                        value={formData.jobPostingDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Interview Sheduled:</label>
                    <input
                        type="date"
                        id="jobExpirationDate"
                        name="jobExpirationDate"
                        className="form-control" 
                        value={formData.jobExpirationDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Open Positions:</label>
                    <input
                        type="number"
                        id="openPositions"
                        name="openPositions"
                        className="form-control" 
                        placeholder="Number of Open Positions"
                        value={formData.openPositions}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Company Contact:</label>
                    <input
                        type="text"
                        id="companyContact"
                        name="companyContact"
                        className="form-control" 
                        placeholder="Enter Contact Email"
                        value={formData.companyContact}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Benefits :</label>
                    <textarea
                        id="benefits"
                        name="benefits"
                        className="form-control" 
                        placeholder=""
                        value={formData.benefits}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        id="remoteWorkOption"
                        name="remoteWorkOption"
                        className="form-check-input"
                        checked={formData.remoteWorkOption}
                        onChange={handleInputChange}
                        
                    />      
                   <label className="form-label" for="flexCheckDefault">
                         Remote Work Availability
                    </label>
                </div>
                <button type="submit" className="btn btn-primary cp-btn">Create Post</button>
            </form>
        </div>
        </div>

    </div>
  )
}

export default CreatePost