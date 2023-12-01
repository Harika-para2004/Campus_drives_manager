import {useState} from 'react'
import { FaTimes } from 'react-icons/fa';
import './loginForm.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const [showSignup,setShowSignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const closeRegistrationForm = () => {
        setShowSignup(false);
      };
 // , { state: {role: 'employer'}}

    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5001/login', {email, password})
    .then(res => {
        console.log("inside response",res.data.status)
        // navigate('/employer');
        if(res.data.status === "success"){
          console.log("logged in successfully")
          const role = res.data.role; 
          localStorage.setItem("userToken",res.data.token)
          localStorage.setItem("roleToken",role)
          localStorage.setItem("id",res.data.id)
          setUserRole(role);
          if(role === "student"){
            navigate('/student')
            alert("student")
          } else if(role === "employer"){
            navigate('/employer')
            alert("employer");
          } else if(role === "admin"){
            alert("admin")
            navigate('/dash')
          }
          else if(res.data === "not found"){
            alert('Email or Password not matched')
            navigate('/');
          }
          else{
              alert("user is not available")
          }
        }
        else{
          alert("email or password is incorrect");
        }
    }).catch((err) => {
      console.log(err)
      alert("error occured")
    })
    }

  return (
        showSignup && (<div className="log-cont">
              <div className='blur-bg-overlay show-popup'></div> 
              <div className='form-popup show-popup'>
              <span className='close-btn'><FaTimes onClick={closeRegistrationForm} /></span>
              <div className='form-box'>
                <div className='form-details'>
                  <h2>Welcome Back</h2>
                  <p>Please log in using your personal information to stay connected with us.</p>
                </div>
                <div className='form-content'>
                  <h2>LOGIN</h2>
                  <form onSubmit={handleSubmit} >
                    <div className='input-field'>
                      <input 
                      type="text"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required/>
                      <label>Email</label>
                    </div>
                    <div className='input-field'>
                      <input 
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required/>
                      <label>Password</label>
                    </div>
                    <input type="submit" value={"Login"} /> 
                    <div className='bottom-link'>
                      Don't have an account ?<b>Register</b>
                    </div>

                  </form>
                </div>
              </div>
          </div>
          </div>)
  )
}

export default LoginForm


