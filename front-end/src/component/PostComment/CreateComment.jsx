import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdAccountCircle } from 'react-icons/md';

const CreateComment = (props) => {
    const PostId = props.id;
    const handleNewComment = props.onCreate;
    const [userDataName, setUserDataName] = useState({});
    const [userDataImage, setUserDataImage] = useState({});
    const [sessionId, setSessionId] = useState(-1);
    const [commentText, setCommentText] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const savedSessionId = Cookies.get('sessionId');
            if (savedSessionId >= 0) {
                setSessionId(savedSessionId);
                try {
                    // Fetch user data (name)
                    console.log('Fetching user name...');
                    const nameResponse = await axios.post('http://localhost:5555/user/getusername', {
                        sessionId: savedSessionId
                    });
                    setUserDataName(nameResponse.data);

                    // Fetch user data (image)
                    console.log('Fetching user image...');
                    const imageResponse = await axios.post('http://localhost:5555/user/getImage', {
                        sessionId: savedSessionId,
                        type: 1
                    });
                    setUserDataImage(imageResponse.data);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            } else {
                console.error('No session ID found');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Automatically adjust the textarea height based on content
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '35px';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [commentText]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Add your logic for handling form submission here
            const response = await axios.post('http://localhost:5555/comment/create', {
                text: commentText,
                userId: sessionId,
                postId :  PostId
            });
            console.log('Comment created:', response.data);
            // Reset the post text after submission
            setCommentText('');

            handleNewComment();
            
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleTextChange = (event) => {
        setCommentText(event.target.value);
    };
  return (
    <div className='w-full flex border-b-2 border-r-2 border-l-2 border-gray-700 p-4 py-2  bg-[#F0F0F0]'>
    <div className='mr-4'>
        {/* Render user image here */}
        {userDataImage['Imagepath']!= -1 ? (
            <img className='h-9 w-10  rounded-full border-2 border-black' src={userDataImage['Imagepath']} alt="User" />
        ) : (
            <MdAccountCircle size={30} color='black' />
        )}
    </div>
    <div className='flex flex-col w-full'>
        <div>
            <span className='font-semibold text-black'>{userDataName.username}:</span>
        </div>
        <div>
            <form className='flex flex-col items-end' onSubmit={handleSubmit}>
                <textarea
                    ref={textAreaRef}
                    className='w-full border-gray-900 border-2 resize-none'
                    placeholder="Say something beauty, Dont' be rasict "
                    value={commentText}
                    onChange={handleTextChange}
                />
                <button
                    className='bg-[#41BFB3] mt-2 text-black px-2 rounded-3xl font-semibold'
                    type="submit"
                >
                    Go
                </button>
            </form>
        </div>
    </div>
</div>
  )
}

export default CreateComment