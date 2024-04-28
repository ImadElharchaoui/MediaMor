import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TiMediaRewind } from 'react-icons/ti';
import { FiAlertCircle } from "react-icons/fi";
import IMAGE1 from '../Images/MarocLoginWallpaper.jpg';
import IMAGE2 from '../Images/MarocLoginWallpaper2.jpg';
import IMAGE3 from '../Images/MarocLoginWallpaper3.jpg';

import { Carousel } from "@material-tailwind/react";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Password') {
      setPassword(value);
    } else if (name === 'Remember') {
      setRememberMe(!rememberMe);
    }



  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, you can send a request to your backend to authenticate the user
    if(email == '' || password == '' || email.indexOf('@') == -1 || password.length < 5){
      setError(true)
      return 0;
    }
    try {
      const requestData = {
        email,
        password
      };
      const response = await axios.post('http://localhost:5555/user/login', requestData);
      console.log(response);
      if(response.data['userid']!= null && response.data['userid'] >= 0){
        if(rememberMe){
            
            Cookies.set("sessionId" , response.data['userid'] , { expires: 7 })
            
        }else{
          Cookies.set("sessionId" , response.data['userid'] , { expires: 1 })
        }
        
        navigate("/");
      }else{
          setError(true);
        }
      // handle success response
    } catch (error) {
      console.error('Error:', error);
      // handle error response
    }

  };

  return (
    <div className='bg-[#41BFB3] h-screen w-screen flex items-center justify-between overflow-hidden'>
      <div className='h-screen w-1/2 flex justify-end'>
        <Carousel className="" autoplay={true} autoplayDelay={6000} loop={true}>
          <img src={IMAGE1} alt="image 1" className="h-full w-full object-cover" />
          <img src={IMAGE2} alt="image 2" className="h-full w-full object-cover" />
          <img src={IMAGE3} alt="image 3" className="h-full w-full object-cover" />
        </Carousel>
      </div>

      <div className='flex flex-col justify-center items-center w-1/2 h-full'>
        <div className='flex text-white text-4xl items-center'>
          <TiMediaRewind color='white' size={100}/>
          MediaMor
        </div>
        <div className=''>
          <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <h1 className='p-4 text-3xl text-white'>Login</h1>
            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor="Email">Email</label>
              <input
                className='w-[400px] h-[28px] border-2 border-black rounded-lg px-2 mb-2'
                placeholder='Email'
                name="Email"
                type="email"
                value={email}
                onChange={handleInputChange}
              />
              <label className='font-semibold' htmlFor="Password">Password</label>
              <input
                className='w-[400px] h-[28px] border-2 border-black rounded-lg px-2 mb-2'
                placeholder='Password'
                name='Password'
                type="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex items-center justify-between w-full mt-4'>
              <div className='flex justify-center items-center'>
                <input
                  className='w-4 h-4 text-[#275950] bg-gray-100 mr-1 border-gray-300 rounded focus:ring-[#275950] dark:focus:ring-[#275950] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  type="checkbox"
                  name="Remember"
                  id="Remember"
                  checked={rememberMe}
                  onChange={handleInputChange}
                />
                <p className=''>Remember Me</p>
              </div>
              <a className='text-sm' href="#">Forget your Password?</a>
            </div>
            <button type='submit' className='bg-white rounded-xl px-6 mt-4 font-bold'>Login</button>
          </form>
          { error ? <div  className='mt-8 absolute text-center top-20'>
                        <p className='w-[400px] bg-orange-200 px-4 py-2 rounded-lg flex flex-col justify-center items-center'><FiAlertCircle className='mb-2' color='red' size={20} />  there an error! <br />
                                                                  please check if you fill your email and password </p>
                    </div> : <></>}
          <Link to={"/signup"}><p className='mt-4 justify-end items-end'>don't have account ? <span className='text-white'>Join Us Now</span></p></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
