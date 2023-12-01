import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
    const [suc,setSuc] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5001/dash')
        .then(res => {
            if(res.data === "Success"){
                setSuc("Succeeded OK")
            } else {
                navigate('/home')
            }
        }).catch(err => console.log(err))
    },[])

  return (
    <div>
        <h2>DashBoard</h2>
        <p>{suc}</p>
    </div>
  )
}

export default Dash