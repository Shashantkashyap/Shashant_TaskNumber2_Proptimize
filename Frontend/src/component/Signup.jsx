import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from"react-router-dom"
import './Signup.css';

function Signup() {

  
  const navigate = useNavigate();


  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    contact: '',
    otp:""
  });

  const getOtp = async()=>{
    const o = await axios.post('http://localhost:3000/api/otp', { email: data.email });
    console.log(o)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post('http://localhost:3000/api/signup', data);

      

      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      localStorage.setItem("token", token);
  
      
      console.log(response);
      navigate("/");
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  

  return (
    <div className="signup-container">
      <form className="signup-form flex flex-col gap-10 " onSubmit={handleSubmit}>
        <h1 className=' text-4xl font-bold mx-auto'>SignUp Form</h1>
        <div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="firstName"
            id="firstName"
            value={data.firstName}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="lastName"
            id="lastName"
            value={data.lastName}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

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

        <div className='flex justify-between mb-5'>
        <label htmlFor="otp">OTP</label>
       <div className='flex  gap-8 w-[500px] '>
       <input
          className=' p-1 shadow-md'
            type="text"
            name="otp"
            id="otp"
            value={data.otp}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <button onClick={getOtp} className='  bg-blue-300 hover:bg-blue-500 text-sm font-semibold hover:scale-[1.1] p-1 shadow-lg'>Get OTP</button>
       </div>
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
          className=' p-1 shadow-md'
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="address"
            id="address"
            value={data.address}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="contact"
            id="contact"
            value={data.contact}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>
        </div>
            
        <div className='flex gap-10'>
        
            <button type="submit" className=' bg-blue-300 hover:bg-blue-500 text-xl font-semibold hover:scale-[1.1] p-2 shadow-md'>Submit</button>
            

            
           <Link to={"/login"}>
           <button  className=' bg-green-300 hover:bg-green-500 text-xl font-semibold hover:scale-[1.1] p-2 shadow-md'>Already registered</button>

            
           </Link>

        </div>
      
      </form>
    </div>
  );
}

export default Signup;
