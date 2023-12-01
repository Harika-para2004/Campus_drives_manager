import React , { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Select from 'react-select'

const ApplicationForm = () => {
    // const id = localStorage.getItem("id")
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobType: "Full-time",
        jobLocation: "",
        jobDescription: "",
        qualifications: "",
        skills: [],
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
        // Update the skills array within formData
        setFormData({
          ...formData,
          skills: selectedOptions,
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
        <h2>CreatePost</h2>
        <div className='form-cont' style={{ height: '80vh',padding: '10px' ,overflow: 'auto'}}>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input 
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        type="text"
                        name="jobTitle" className="form-control" placeholder="Job Title" />
                </div>
                    <div className="mb-3">
                        <label htmlFor='jobType' className="form-label">Job Type:</label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>


                <div className="mb-3">
                    <label className="form-label">Job Location:</label>
                    <input type="text" name="jobLocation" 
                    value={formData.jobLocation}
                    onChange={handleInputChange} 
                    className="form-control" 
                    placeholder="Job Location" />
                </div>
           
                
                <div className="mb-3">
                    <label className="form-label">Job Description:</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        className="form-control"
                        onChange={handleInputChange}
                        placeholder="Job Description"
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Qualifications:</label>
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
                    <label className="form-label">Skills :</label>
                    <Select
                    isMulti
                    name="jobPreferences"
                    options={[
                        { label: "JavaScript", value: "JavaScript" },
                        { label: "React", value: "React" },
                        { label: "Node.js", value: "Node.js" }
                        // Add more skills here
                        ]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formData.jobPreferences}
                    onChange={ handleSkillsChange }
                />
                </div>


                <div className="mb-3">
                    <label className="form-label">Salary Range:</label>
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
                    <label className="form-label">Application Deadline:</label>
                    <input
                        type="date"
                        id="applicationDeadline"
                        name="applicationDeadline"
                        className="form-control" 
                        placeholder=""
                        value={formData.applicationDeadline}
                        onChange={handleInputChange}
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
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Job Expiration Date:</label>
                    <input
                        type="date"
                        id="jobExpirationDate"
                        name="jobExpirationDate"
                        className="form-control" 
                        value={formData.jobExpirationDate}
                        onChange={handleInputChange}
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
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"></label>
                    <textarea
                        id="benefits"
                        name="benefits"
                        className="form-control" 
                        placeholder=""
                        value={formData.benefits}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="form-check">
                    <input
                        type="checkbox"
                        id="remoteWorkOption"
                        name="remoteWorkOption"
                        className="form-check-input"
                        checked={formData.remoteWorkOption}
                        onChange={handleInputChange}
                    />      
                   <label class="form-check-label" for="flexCheckDefault">
                        Remote Work Availability
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Create Post</button>
            </form>
        </div>
    </div>
  )
}

export default ApplicationForm