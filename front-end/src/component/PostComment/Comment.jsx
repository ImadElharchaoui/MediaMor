import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { GrLike } from "react-icons/gr";


const Comment = (props) => {
    const Cid = props.id;

    const [commentData, setCommentData] = useState({});
    const [userDataName, setUserDataName] = useState({});
    const [userDataImage, setUserDataImage] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/comment/${Cid}`);
                setCommentData(response.data);
                console.log("user",response.data.UserId)
                if (response.data.UserId != null) {
                    // Fetch user data (name)
                    
                    const nameResponse = await axios.post('http://localhost:5555/user/getusername', {
                      sessionId: response.data.UserId
                    });
                    setUserDataName(nameResponse.data);
          
                    // Fetch user data (image)
                    const imageResponse = await axios.post('http://localhost:5555/user/getImage', {
                      sessionId: response.data.UserId,
                      type: 1
                    });
                    setUserDataImage(imageResponse.data);
                    
                } 
            } catch (error) {
                console.error('Error fetching comment data:', error);
            }
        };
        fetchData();
    }, [Cid]);

    return (
        <div className='w-full flex' onClick={()=>{navigate(`/account/${commentData.UserId}`)}}>
            <div className='mr-4'>
                {/* Render user image here */}
                {userDataImage['Imagepath']!= -1 ? (
                    <img className='h-9 w-10 rounded-full border-2 border-black' src={userDataImage['Imagepath']} alt="User" />
                ) : (
                    <MdAccountCircle size={30}/>
                )}
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex items-center'> 
                    <span className='font-semibold mr-2'>{userDataName.username} </span>
                    <p className=' text-sm'>
                        {commentData.commentTimeMake >= commentData.commentTimeRemake
                            ? moment(commentData.commentTimeMake,"YYYY-MM-DD HH:mm:ss").fromNow()
                            : moment(commentData.commentTimeRemake,"YYYY-MM-DD HH:mm:ss").fromNow()}
                    </p>
                    <p className='ml-4'>
                        {commentData.commentTimeMake <= commentData.commentTimeRemake && <span className=' text-xs'>edited</span>}
                    </p>
                </div>
                <div>
                    {/* Render comment text here */}
                    <p>{commentData.commentText}</p>
                </div>
                <div className='flex justify-end'>
                    {commentData.Nlikes}<GrLike className='ml-2' />
                </div>
            </div>
        </div>
    );
}

export default Comment;
