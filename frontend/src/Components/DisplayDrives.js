import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './displaydrive.css'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
// import './homenav.css'
import JobDriveListItem from './JobDriveListItem';
import { Audio } from 'react-loader-spinner';

const DisplayDrives = () => {
    const stdid = localStorage.getItem("id");
    const [jobdrives, setJobdrives] = useState([]);
    // const [filterapply, setfilterapply] = useState(false); 
    const [appliedStatus, setAppliedStatus] = useState({});
    const [filteredItems, setFilteredItems] = useState(jobdrives);
    const userAppliedStatusKey = `appliedStatus_${stdid}`;
    const [loading, setLoading] = useState(true); 


    const updateAppliedStatus = (newStatus) => {
      setAppliedStatus(newStatus);
      localStorage.setItem(userAppliedStatusKey, JSON.stringify(newStatus));
    };

    useEffect(() => {
        const storedAppliedStatus = localStorage.getItem(userAppliedStatusKey);
        if (storedAppliedStatus) {
          setAppliedStatus(JSON.parse(storedAppliedStatus));
        }

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5001/getdrives');
            setJobdrives(response.data.data);
            setFilteredItems(response.data.data)
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);

      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       const response = await axios.get('http://localhost:5001/getapplications');
      //       console.log(response.data.data)
      //     } catch(error) {
      //       console.log("error: ",error)
      //     }
      //   };
      //   fetchData();
      // }, [appliedJobId]);

      const setfilterapply = (option) => {
        if(option === "applied" ){
          const filtered = jobdrives.filter((jobdrive) => appliedStatus[jobdrive._id] === "applied" )
          setFilteredItems(filtered)
        } else if(option === "notapplied"){
          const filtered = jobdrives.filter((jobdrive) => appliedStatus[jobdrive._id] !== "applied" )
          setFilteredItems(filtered)
        } else{
          setFilteredItems(jobdrives)
        }
      }

      const handleApply = async (jobdrive) => {
        const updatedStatus = {
          ...appliedStatus,
          [jobdrive._id]: 'applied',
        };
    
        updateAppliedStatus(updatedStatus);

        const data = {
          student: stdid,
          jobPost: jobdrive._id,
          employer: jobdrive.employer,
        };

        axios.post('http://localhost:5001/apply', data)
        .then((response) => {
          if (response.status === 201) {
            alert("Applied successfully");
          } else {
            alert("error occured");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("error");
        });

        // const updatedJobDrives = jobdrives.map((eachdrive) =>
        // jobdrive._id === eachdrive._id ? { ...eachdrive, applied: stdid } : jobdrive
        // );
        // setJobdrives(updatedJobDrives);
      };

  return (
   <>
   { 
      loading ? (
        <div className='loader' >
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

            ) : (<div className='jobdrive-page'>
      
      <div className='jobdrive-card'>
      <div className='filter-btns' >
        <button onClick={() => setfilterapply('all')}>Show All</button>
        <button onClick={() => setfilterapply('applied')}>Show Applied</button>
        <button onClick={() => setfilterapply('notapplied')}>Show Not Applied</button>
      </div>
      <h1 className='jd-head'>Job Drives</h1>
      <ul className='jd-ul'>
        {filteredItems.map((jobdrive) => (
            <JobDriveListItem jobdrive={jobdrive} appliedStatus={appliedStatus} handleApply={handleApply} />
        ))}
      </ul>
    </div>
    </div>)}
   </>
  )
}

export default DisplayDrives