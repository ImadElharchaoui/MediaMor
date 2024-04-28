import React, { useState, useEffect } from 'react';
import { TiMediaRewind } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaBlackberry } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropDown,  setDropDown] = useState(false)
  const [sessionId, setSessionId] = useState(-1);
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    try {
      const savedSessionId = Cookies.get('sessionId');
      
      if (savedSessionId >= 0) {
        setSessionId(savedSessionId);
        getUserData(savedSessionId);
      } else {
        // Redirect if there's no session ID
        navigate("/login");
      }
      
    } catch (error) {
      console.error('Error retrieving session ID:', error);
    }
  }, []);

  const handleSumbit = () => {
    console.log('sss')
  }

  const getUserData = async (sessionId) => {
    try {
      const [userData, userImagePath] = await Promise.all([
        getUsername(sessionId),
        getUserImage(sessionId)
      ]);
      
      setUsername(userData.username != -1 ? <button className='mr-2'>{userData.username}</button> : <p className='mr-2'>anonymous</p>);
      setUserImage(userImagePath != -1 ? <img className='h-10 w-10 rounded-full' src={userImagePath} alt="userimage" /> : <MdAccountCircle size={30} color='#275950' />);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle errors here
    }
  };

  const getUsername = async (sessionId) => {
    const response = await axios.post("http://localhost:5555/user/getusername", { sessionId });
    return response.data;
  };

  const getUserImage = async (sessionId) => {
    const response = await axios.post("http://localhost:5555/user/getImage", { sessionId, type:1 });
    return response.data.Imagepath;
  };

  return (
    <div className='bg-[#91F2E9] flex items-center py-2 px-16 font-bold justify-between'>
      <div onClick={()=>{navigate('/')}} className='flex text-[#275950] text-2xl items-center'>
        <TiMediaRewind color='#275950' size={50} />
        MediaMor
      </div>
      <div>
        <form className="relative flex items-center" onSubmit={handleSumbit} method="post">
          <input className='border-2 rounded-lg border-[#275950] font-semibold leading-[1.6] mr-1 px-2 w-[400px]' type="text" />
          <button type='submit'>
            <FaSearch className='text-gray-400' color='#275950' size={20} />
          </button>
        </form>
      </div>
      
          <div onClick={()=>{setDropDown(!dropDown)}} className='flex justify-center items-center'>
            {username}
            {userImage}
          </div>
          { dropDown &&
          <div className='bg-[#41BFB3] absolute z-10 top-16 right-4 rounded-b-3xl drop-shadow-2xl'>
            <ul className='flex flex-col p-4'>
                    <button className='flex mt-2 items-center' onClick={()=>{navigate(`/account/${sessionId}`)}}><MdManageAccounts className='mr-2' size={20} color='white' /><p>MyAccount</p></button>
                    <button className='flex mt-2 items-center'><IoSettingsOutline className='mr-2' size={20} color='white' /><p>Settings</p></button>
                    <button className='flex mt-2 items-center'><MdSwitchAccount className='mr-2' size={20} color='white' /><p>Swap Accounts</p></button>
                    <button className='flex mt-2 items-center'><FaBlackberry className='mr-2' size={20} color='white' /><p>Not yet definded</p></button>
                    <button className='flex mt-2 items-center' onClick={()=>{Cookies.remove('sessionId'); navigate('/login')}}><RiLogoutCircleRLine className='mr-2' size={20} color='white' /><p>LogOut</p></button>
                  </ul>
              </div>} 
          
          

    </div>
  );
};

export default Navbar;
