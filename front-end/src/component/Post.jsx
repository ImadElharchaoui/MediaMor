import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './PostComment/Comments';
import { MdAccountCircle } from "react-icons/md";
import moment from 'moment';
import { GrLike } from "react-icons/gr";
import { FaComment } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Post = (props) => {
  const postId = props.link;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({});
  const [userDataName, setUserDataName] = useState({});
  const [userDataImage, setUserDataImage] = useState({});
  const [commentsData, setCommentsData] = useState({});
  const [postImage, setPostImage] = useState(-1);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch post data
        console.log('Fetching post data...');
        const postResponse = await axios.get(`http://localhost:5555/post/${postId}`);
        setPostData(postResponse.data);
        

        // Check if post data contains userid before fetching user data
        if (postResponse.data.userid != null) {
          // Fetch user data (name)

          const nameResponse = await axios.post('http://localhost:5555/user/getusername', {
            sessionId: postResponse.data.userid
          });
          setUserDataName(nameResponse.data);

          // Fetch user data (image)

          const imageResponse = await axios.post('http://localhost:5555/user/getImage', {
            sessionId: postResponse.data.userid,
            type: 1
          });
          setUserDataImage(imageResponse.data);


        }

        const postImage = await axios.post('http://localhost:5555/user/getImage', {
          sessionId: postId,
          type:2
        })
        setPostImage(postImage.data['Imagepath'])
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>; // Return loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Return error message
  }

  

  return (
    <>
    <div className='border-2 bg-[#F0F0F0] border-gray-700 p-4 mt-4'>
      <div onClick={()=>{navigate(`/account/${postData.userid}`)}} className='flex items-center mb-4 ml-4'>
        {userDataImage['Imagepath']!= -1 ? (
          <img className='h-10 w-10 rounded-full border-2 border-black' src={userDataImage['Imagepath']} alt="User" />
        ) : (
          <MdAccountCircle className='' size={40} color='gray' />
        )}
        <p className='mx-4 font-semibold'>{userDataName.username}</p>
        
        {/* Use moment to format the date */}
        <p>
          {postData.PostTimeMake >= postData.PostTimeRemake
            ? moment(postData.PostTimeMake,"YYYY-MM-DD HH:mm:ss").fromNow()
            : moment(postData.PostTimeRemake,"YYYY-MM-DD HH:mm:ss").fromNow()}
        </p>
        {/* Render "edited" if needed */}
        <p className='ml-4'>
          {postData.PostTimeMake <= postData.PostTimeRemake && <span className=' text-sm'>edited</span>}
        </p>
      </div>
      <div className='flex flex-col'>
        <h2>{postData.postText}</h2>
        {postImage != -1 &&
          <div className='flex justify-center'>
            <img className='h-[400px]' src={postImage} alt="" />
          </div>
        }
      </div>
      <div className='flex items-center  justify-around mt-4 pt-3 border-t-2 border-gray-700'>
            <div className='flex items-center'>
              <span className='mr-2'>{postData.Nlikes}</span><GrLike />
            </div>
            <div className='flex items-center'>
              <span className='mr-2'>{postData.Ncomments}</span><FaComment />
            </div>
            <div className='flex items-center'>
              <span className='mr-2'></span><FaShareFromSquare />
            </div>
      </div>
    </div>
    <div>
            <Comments id={postId}/>
    </div>
    </>
  );
};

export default Post;
