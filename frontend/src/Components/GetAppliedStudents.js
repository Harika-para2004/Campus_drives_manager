import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GetStudents from './GetStudents'

const GetAppliedStudents = () => {
    const [appliedStudents,setAppliedStudents] = useState([]);
    const [students,setStudents] = useState();
    const [count, setCount] = useState(0);
    const id = localStorage.getItem("id");
    const uniqueSids = Array.from(new Set(appliedStudents.map(item => item.student)));
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:5001/getappliedstudents',{id});
             setAppliedStudents(response.data.results);
             setCount(response.data.count)
            } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {

        console.log("appliedStudents: ",appliedStudents )
          axios.post('http://localhost:5001/studentsBySid', { uniqueSids  })
            .then((response) => {
              setStudents(response.data);
              console.log(response.data)
            })
            .catch((error) => {
              console.error(error);
            });
      }, [appliedStudents]);
      
  return (
    <>
    {
      students && <GetStudents students={students} />
    }
    </>
  )
}

export default GetAppliedStudents







