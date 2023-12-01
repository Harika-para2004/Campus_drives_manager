import axios from 'axios';
import React, { useEffect, useState } from 'react';
import lbg from './images/lbg.jpeg'
import './companyprofile.css'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './homenav.css';

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    location: '',
    website: '',
    email: '',
    contactInfo: '',
  });

  const cmpid =localStorage.getItem("id");

  const [submitted, setSubmitted] = useState(() => {
    const storedSubmitted = localStorage.getItem(`submitted_${cmpid}`);
    return storedSubmitted ? JSON.parse(storedSubmitted) : false;
  });

  useEffect(() => {
    localStorage.setItem(`submitted_${cmpid}`, JSON.stringify(submitted));
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
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : e.target.value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!submitted){
      axios.post('http://localhost:5001/company-profile', {formData:formData,id:cmpid})
      .then((response) => {
          if(response.data === "success"){
              setSubmitted(true)
              alert("successfully saved",submitted);
          }
          else{
              alert("fill all the required fields");
          }
      })
      .catch((error) => {
          console.log("ERROR OCCURED: ",error.message)
          alert("error occured please try again")   
      })
    } else {
      axios.put('http://localhost:5001/company-profile', {formData:formData,id:localStorage.getItem("id")})
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
    <div className="c-prof" >
      
    <div className='company-profile-page'></div>
    <div className='cpg-cont'>
      <h2 className='cpg-head' >Profile Details</h2>
      <form className='cpg-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyLogo">Company Logo</label>
          <input
            type="file"
            className="form-control-file"
            id="companyLogo"
            name="companyLogo"
            onChange={handleInputChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="applicationForm">Application Form Link</label>
          <input
            type="url"
            className="form-control"
            id="applicationForm"
            name="applicationForm"
            value={formData.applicationForm}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
          />
        </div>
        {
          !submitted ? <button type="submit" className="btn btn-primary">
          Submit
        </button>
        : <button type="submit" >Edit</button>
        }
      </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
