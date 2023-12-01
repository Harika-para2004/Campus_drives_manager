import React from "react";
// import LandingPage from './Landing/LandingPage'
// import Loginpage from "./Login/Loginpage";
import {Navigate, Route,Routes } from "react-router-dom";
import LoginForm from './Components/Login/LoginForm'
import Dash from "./Components/Dash";
import FrontPage from "./Components/FrontPage";
import Student from "./Components/Student";
import Employer from "./Components/Employer";
import CreatePost from "./Components/CreatePost";
import StudentProfileCreate from "./Components/StudentProfileCreate";
import GetStudents from "./Components/GetStudents";
import OurService from "./Components/OurService";
import PostByCompany from "./Components/PostByCompany"
import CompanyProfile from "./Components/CompanyProfile";
import DisplayDrives from "./Components/DisplayDrives";
import Loginpage from "./Components/Login/Loginpage";
import ApplicationForm from './Components/ApplicationForm'
import JobDriveDetails from "./Components/JobDriveDetails";
import GetAppliedStudents from "./Components/GetAppliedStudents";
// import { useLocation } from "react-router-dom";
import StudentViewMore from './Components/StudentViewMore'
import Contact from "./Components/Contact/Contact" 

export default function App() {
  // const location = useLocation();
  // const userRole = location.state?.role;
  const userRole = localStorage.getItem("roleToken")

  const getRoutesBasedOnRole = () => {
    if (userRole === 'student') {
      return (
        <>
          <Route path="/student" element={<Student />} />
          <Route path="/studentprofiles" element={<StudentProfileCreate/>} ></Route>
          <Route path="/getstudents" element={<GetStudents/>} ></Route>   
          <Route path="/studentViewMore" element={<StudentViewMore/>} ></Route>     
        </>
      );
    } else if (userRole === 'employer') {
      return (
        <>
          <Route path="/employer" element={<Employer />} />
          <Route path="/createpost" element={<CreatePost/>} ></Route>
          <Route path="/companyProfile" element={<CompanyProfile/> } ></Route>
        </>
      );
    } else {
      // Default or unknown role, you can handle this as needed
      return <Navigate to="/" />;
    }
  };  

  return (
    <div className="App">
      
      <Routes> 
        <Route path="/" element={<FrontPage/>} ></Route>
        <Route path="/dash" element= {<Dash/>} ></Route>
        <Route path="/login" element={<LoginForm />} ></Route>
        {/* <Route path="/student" element={<Student />} ></Route> */}
        {/* <Route path="/employer" element={<Employer />}></Route> */}
        {/* <Route path="/createpost" element={<CreatePost/>} ></Route> */}
        {/* <Route path="/studentprofiles" element={<StudentProfileCreate/>} ></Route> */}
        {/* <Route path="/getstudents" element={<GetStudents/>} ></Route> */}
        <Route path="/ourServices" element={<OurService/>} ></Route>
        <Route path="/getpost-by-id" element={ <PostByCompany/> } ></Route>
        {/* <Route path="/companyProfile" element={<CompanyProfile/> } ></Route> */}
        <Route path="/displaydrives" element={<DisplayDrives/>} ></Route>
        <Route path="/jobDriveDetails" element={ <JobDriveDetails/> } ></Route>
        <Route path="/applicationForm" element={<ApplicationForm/> } ></Route>
        <Route path="/getappliedstudents" element={<GetAppliedStudents/>} ></Route>
        <Route path="/studentViewMore" element={<StudentViewMore/>} ></Route>
        <Route path="/contact" element={<Contact />} ></Route>
        {getRoutesBasedOnRole()}
      </Routes>
    </div>
  );
}
