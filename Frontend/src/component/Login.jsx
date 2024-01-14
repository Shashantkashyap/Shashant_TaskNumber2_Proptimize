import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from"react-router-dom"
import axios from "axios"

import './Signup.css'


function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
 
      const [data, setData] = useState({
    
    email:"",
    password :"",
    
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set loading to true
    setLoading(true);
  
    console.log(data);
  
    try {
      const response = await axios.post("https://task2-h38y.onrender.com/api/login", data);
      const token = response.data.token;
  
      localStorage.setItem("token", token);
  
      console.log(localStorage.getItem("token"));
      console.log(response);
  
    } catch (error) {
      console.error('Error logging in:', error);
      
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  
  return (
    <div className="signup-container">
      <form className="signup-form flex flex-col gap-10 " onSubmit={handleSubmit}>
        <h1 className=' text-4xl font-bold mx-auto'>Login Form</h1>
        <div>
        

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
          className=' p-1 shadow-md'
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          className=' p-1 shadow-md'
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        

        
        </div>
            
        <div className='flex gap-10'>
         
          <button type="submit" disabled={loading} className=' bg-blue-300 hover:bg-blue-500 text-xl font-semibold hover:scale-[1.1] p-3 shadow-md'>
  {loading ? 'Submitting...' : 'Submit'}
  
</button>


            <Link to="/signup">
            <button className=' bg-green-300 hover:bg-green-500 text-xl font-semibold hover:scale-[1.1] p-3 shadow-md'>SignUp</button>

            </Link>

        </div>
      
      </form>
    </div>
  )
}

export default Login
