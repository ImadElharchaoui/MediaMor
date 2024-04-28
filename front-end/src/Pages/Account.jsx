import React, { useEffect, useState } from 'react';
import { MdOutlineFlipCameraIos, MdAccountCircle } from "react-icons/md";
import { FaPersonCirclePlus, FaPersonCircleMinus } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AccountWallpaper from '../Images/ProfileWallpaper1.jpg';

import Navbar from '../component/Navbar';

// Components
import Info from '../component/AccountComponent/Info';
import AccountPostController from '../component/AccountComponent/AccountPostController';
import FollowersController from '../component/AccountComponent/FollowersController';
import FollowingController from '../component/AccountComponent/FollowingController';

const Account = () => {
    const { AccountId } = useParams();
    const [sessionId, setSessionId] = useState(-1);
    const [activeTab, setActiveTab] = useState('Profile');
    const [accountData, setAccountData] = useState({});
    const [userDataImage, setUserDataImage] = useState({});
    const [loading, setLoading] = useState(true);
    const [followed, setFollowed] = useState(false);
    const [followMessage, setFollowMessage] = useState('');

    const getUser = async () => {
        const response = await axios.get(`http://localhost:5555/user/${AccountId}`);
        return response.data.results[0];
    };

    const getUserImage = async (sessionId) => {
        const response = await axios.post('http://localhost:5555/user/getImage', {
            sessionId,
            type: 1
        });
        return response.data.Imagepath;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedSessionId = Cookies.get('sessionId');
                if (savedSessionId >= 0) {
                    setSessionId(savedSessionId);
                }

                const user = await getUser();
                setAccountData(user);
                setLoading(false);

                if (user.id) {
                    const imagePath = await getUserImage(user.id);
                    setUserDataImage({ ImagePath: imagePath });
                }

                
            } catch (error) {
                console.error('Error fetching account data:', error);
                setLoading(false);
            }
        };

        fetchData();
        handleFollow();

    }, [AccountId, sessionId]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:5555/images/upload/${AccountId}/${1}`, formData);
            setUserDataImage(response.data);
            const imagePath = await getUserImage(accountData.id);
            setUserDataImage({ ImagePath: imagePath });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleAddFollow = async () => {
        try {
            await axios.post('http://localhost:5555/follower/create', { followerId: sessionId, followingId: AccountId });
            handleFollow()
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleRemoveFollow = async () => {
        try {
            await axios.post('http://localhost:5555/follower/delete', { followerId: sessionId, followingId: AccountId });
            handleFollow()
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await axios.post('http://localhost:5555/follower/isfollow', {
                
                    followerId: sessionId,
                    followingId: AccountId
                
            });
            setFollowed(response.data.isFollowing);
        } catch (err) {
            console.error('Error :', err)
        }
    }
    

    return (
        <>
            <Navbar />
            <div className='relative pt-8 lg:px-52 sm:px-2 w-full h-full bg-[#F0F0F0]'>
                {followMessage && <div className='absolute bg-red-500' onClick={() => { setFollowMessage('') }}>{followMessage}</div>}
                <div className='bg-center bg-cover w-full h-[400px] rounded-t-2xl flex' style={{ backgroundImage: `url(${AccountWallpaper})` }}>
                    {sessionId == AccountId &&
                        <div className='absolute top-12 left-56 p-4 bg-gray-700 bg-opacity-50 rounded-full items-end'>
                            <label htmlFor="fileInput">
                                <MdOutlineFlipCameraIos className='' size={30} color='white' />
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                        </div>
                    }
                    <div className='mr-4 flex justify-end items-end'>
                        {/* Render user image here */}
                        {userDataImage && userDataImage.ImagePath !== -1 ? (
                            <img className='mb-4 ml-4 bg-white rounded-full h-36 w-36' src={userDataImage.ImagePath} alt="User" />
                        ) : (
                            <MdAccountCircle className='mb-4 ml-4 bg-white rounded-full h-36 w-36' />
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex bg-[#41BFB3] items-center">
                        <h2 className='px-8 pr-24 text-black font-bold'>{accountData.username}</h2>
                        <button className={`p-2 px-8 text-white ${activeTab === 'Profile' && 'bg-gray-800'}`} onClick={() => handleTabChange('Profile')}>Info</button>
                        <button className={`p-2 px-8 text-white ${activeTab === 'Posts' && 'bg-gray-800'}`} onClick={() => handleTabChange('Posts')}>Posts</button>
                        <button className={`p-2 px-8 text-white ${activeTab === 'Comments' && 'bg-gray-800'}`} onClick={() => handleTabChange('Comments')}>Comments</button>
                        <button className={`p-2 px-8 text-white ${activeTab === 'Follower' && 'bg-gray-800'}`} onClick={() => handleTabChange('Follower')}>Followers</button>
                        <button className={`p-2 px-8 mr-4 text-white ${activeTab === 'Following' && 'bg-gray-800'}`} onClick={() => handleTabChange('Following')}>Following</button>
                        {sessionId != AccountId && (
                            
                            <button className='flex text-white rounded-3xl bg-gray-800 px-4 p-2' onClick={followed ? handleRemoveFollow : handleAddFollow}>
                                {followed ? <><FaPersonCircleMinus className='mr-1' size={20} /> UnFollow</> : <><FaPersonCirclePlus className='mr-1' size={20} /> Follow</>}
                            </button>
                        )}
                    </div>
                    <div className="tab-content">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {activeTab === 'Profile' && <Info AccountId={AccountId} Account={accountData} />}
                                {activeTab === 'Posts' && <AccountPostController AccountId={AccountId} />}
                                {activeTab === 'Comments' && <div className='h-sreen bg-white p-40'>mafiyach awdi li zid comments  tamn be3d "UNDER DEVELOPMENT"</div>}
                                {activeTab === 'Follower' && <FollowersController   AccountId={AccountId} />}
                                {activeTab === 'Following' && <FollowingController   AccountId={AccountId} />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
