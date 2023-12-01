import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Select from 'react-select'
import './studentprofile.css';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const StudentProfileCreate = () => {
    const id = localStorage.getItem('id');
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        email: '',
        branch: '',
        year: '',
        skills: [],
        jobPreferences: [],
        profilePic: null,
        dob:"",
        gender:"",
        grade:"",
    })

    // const [submitted,setSubmitted] = useState(false);

    const [submitted, setSubmitted] = useState(() => {
      const storedSubmitted = localStorage.getItem(`submitted_${id}`);
      return storedSubmitted ? JSON.parse(storedSubmitted) : false;
    });

    useEffect(() => {
      localStorage.setItem(`submitted_${id}`, JSON.stringify(submitted));
    }, [submitted]);

    const handleInputChange = (e) => {
        const { name, type, checked } = e.target;
      
        if (type === 'file') {
          const selectedFile = e.target.files[0];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            setFormData((prevData) => ({
              ...prevData,
              [name]: e.target.result // This will contain the base64-encoded image data
            }));
          };
      
          if (selectedFile) {
            reader.readAsDataURL(selectedFile);
          }
        } else {
          // For other input types, update the form data as before
          setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : e.target.value
          }));
        }
      };
    
    const handleSkillsChange = (selectedOptions) => {
      setFormData({
        ...formData,
        skills: selectedOptions,
      });
    };

    const handleJobsChange = (selectedOptions) => {
      // Update the skills array within formData
      setFormData({
        ...formData,
        jobPreferences: selectedOptions,
      });
    };
      
    const handleSubmit = (e) => {
        e.preventDefault()

        if(!submitted){
        axios.post('http://localhost:5001/student-profiles', {formData,sid:id})
        .then((res) => {
            if(res.data === "success"){
                setSubmitted(true)
                alert("Profile saved Successfully")
            }
        })
        .catch((err) => {
            console.log(err);
        })
        } else {
          axios.put('http://localhost:5001/student-profiles', {formData:formData,id:localStorage.getItem("id")})
          .then((response) => {
              if(response.data === "success"){
                  console.log("successfully saved")
                  alert("successfully updated");
                  setSubmitted(true)
              }
              else{
                  alert("fill all the required fields");
              }
          })
          .catch((error) => {
              console.log("ERROR OCCURED: ",error.message)
              alert("error occured please try again")
          })
        }
    }

  return (
    <div className='s-promain'>
    <h2 className='form-head'>Create Profile</h2>
    <div className='prof-mainCont'></div> 
        {/* <nav className="navbar navbar-expand-lg nav-cp">
        <div className="container-fluid ">
          <span className="navbar-brand wh me-lg-0">Career Blend</span>
          <button className="navbar-toggler bg-white " type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse nav-right" id="navbarText">
            <ul className="navbar-nav fw-bold nav-ul">
              <li className="nav-item active text-decoration-none">
                <Link to="/student" className="nav-link active text-white" aria-current="page">Home</Link>
              </li>
            </ul>
            <span className="navbar-text text-white">
            <Link to="/studentprofiles" ><FaUser size={32} className='user-icon' /></Link>            
            </span>
          </div>
        </div>
        </nav> */}
        {/* <div className='prof-cont'> */}
        <form onSubmit={handleSubmit} className="row g-3 form-cont">
            <div className="mb-3">
                        <label className="form-label">studentId :</label>
                        <input 
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            type="text"
                            name="studentId" className="form-control" placeholder="Enter Your Id no" 
                        required/>
            </div>
            <div className="mb-3">
                        <label className="form-label">FullName :</label>
                        <input 
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            type="text"
                            name="name" className="form-control" placeholder="Enter full name" 
                            required/>
            </div>
            <div className="mb-3">
                        <label className="form-label">Grade :</label>
                        <input 
                            value={formData.grade}
                            onChange={handleInputChange}
                            type="text"
                            name="grade" className="form-control" placeholder="Enter Your Grade" 
                            required/>
            </div>
            <div className="mb-3">
                        <label className="form-label">Email :</label>
                        <input 
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            type="email"
                            name="email" className="form-control" placeholder="Enter college Email" 
                            required  />
            </div>
            <div className="mb-3">
                        <label className="form-label">Branch :</label>
                        <input 
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            type="text"
                            name="branch" className="form-control" placeholder="Your Branch " 
                            required/>
            </div>
            <div className="mb-3">
                    <label className="form-label">Skills :</label>
                  <Select
                    isMulti
                    name="skills"
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
                    value={formData.skills}
                    onChange={ handleSkillsChange }
                />
            </div>
            <div className="mb-3">
                  <label className="form-label">jobPreferences:</label>
                  <Select
                    isMulti
                    name="jobPreferences"
                    options={[
                      { label: "Web Development", value: "Web Development" },
                      { label: "Full Stack Developer", value: "Full Stack Developer" },
                      { label: "Backend Developer", value: "Backend Developer" }
                      ]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formData.jobPreferences}
                    onChange={ handleJobsChange }
                />
            </div>
            <div className="mb-3">
                        <label className="form-label">Batch :</label>
                        <input 
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            type="number"
                            name="year" className="form-control" placeholder="Year of study" 
                            required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Select Profile </label>
                <input
                type="file"
                name="profilePic"
                onChange={handleInputChange}
                accept="image/*"
                />  
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Upload Resume </label>
                <input
                type="file"
                name="profilePic"
                onChange={handleInputChange}
                accept="image/*"
                />  
            </div> */}
            <div className="mb-3">
                    <label className="form-label">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-control" 
                        value={formData.dob}
                        onChange={handleInputChange}
                        required/>
            </div>
            <div className="mb-3">
                    <label className="form-label"> Gender</label>
                    <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          onChange={handleInputChange}
                          required/>
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                    </div>
            </div>
            
            {
          !submitted ? <button type="submit" className="btn btn-primary">
          Submit
        </button>
        : <button type="submit" >Edit</button>
        }        </form>
        </div>
    // </div>
  )
}

export default StudentProfileCreate