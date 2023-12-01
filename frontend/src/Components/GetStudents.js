import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from 'axios'
import './getstudents.css'
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'


const GetStudents = ({students}) => {
  // const { profiles } = useParams();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      axios.get('http://localhost:5001/get-students')
      .then((res) => {
        if(res.data){
        console.log(res)
        console.log(res.data.data)
        setProfiles(res.data.data);
        } else if(res.message){
            console.log("error from backend")
          }
      })
      .catch((e) => {
          console.log(e)
      }) 
      .finally(() => {
        setLoading(false)
      })
  },[])

  useEffect(()=>{
    if(students && students.length>0){
      setProfiles(students)
    }
  },[profiles])

  return (
    <>
   { 
      loading ? (
        <div className="loader" >
        <Audio
        height="80"
        width="80"
        radius="9"
        color="#003399"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
          </div>
        ) :(
          <div className="get-std-body" >
              <div class="rev-section">
              <h2 class="title">Student Profiles</h2>
              <p class="note">Choose the students who are suitable for your company Go and See and Get the best peoples.</p>
              <div class="reviews">
              {profiles && profiles.map((profile,index)=> (
                <div class="review">
                <div class="head-review">
                {profile.profilePic ? (
                      <img src={profile.profilePic} width="250px" alt={`Profile of ${profile.name}`} />
                    ) : (
                      <img src="default-image.jpg" width="250px" alt="Default Profile" />
                )}
                </div>
                <div class="body-review">
                    <div class="name-review">{profile.studentId}</div>
                    <div class="place-review">BATCH: {profile.year}</div>
                    <h5> BRANCH: {profile.branch}</h5>
                    <h3>CGPA: {profile.grade} </h3>  
                    <div class="desc-review"></div>
                    <Link to="/studentViewMore" state={profile}>
                    <button class="btn">view profile</button>
                    </Link>
                </div>
                </div>
              ))}

              </div>
              </div>
          </div>
        )
      }
  </>
  )
}

export default GetStudents


//cgpa, resume 


{/*

 <>
   { 
      loading ? (
        <Audio
        height="80"
        width="80"
        radius="9"
        color="#003399"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
        ) :()
      }
  </> 

*/}

      