import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";

const AccountCard = (props) => {
    const AccountId = props.AccountId;
    const timeMake = props.time;
    
    const [userDataName, setUserDataName] = useState({});
    const [userDataImage, setUserDataImage] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                
                const nameResponse = await axios.post('http://localhost:5555/user/getusername', {
                    sessionId: AccountId
                });
                setUserDataName(nameResponse.data);
        
                // Fetch user data (image)
                const imageResponse = await axios.post('http://localhost:5555/user/getImage', {
                    sessionId: AccountId,
                    type: 1
                });
                setUserDataImage(imageResponse.data);
                

            } catch (error) {
                console.error('Error fetching comment data:', error);
            }
        };
        fetchData();
    }, [AccountId]);
  return (
    <div className='flex items-center p-2 border-2 border-gray-700' onClick={()=>{navigate(`/account/${AccountId}`)}}>
        <div>
            {/* Render user image here */}
            {userDataImage['Imagepath']!= -1 ? (
                    <img className='h-20 w-20 rounded-full border-2 border-black' src={userDataImage['Imagepath']} alt="User" />
                ) : (
                    <MdAccountCircle className='h-20 w-20 rounded-full border-2 border-black'/>
                )}
        </div>

        <div className='flex flex-col ml-2'>
            <p className='font-bold'>{userDataName.username}</p>
            <p className=' text-sm'>
                {moment(timeMake,"YYYY-MM-DD HH:mm:ss").fromNow()}
                    </p>
        </div>
    </div>
  )
}

export default AccountCard