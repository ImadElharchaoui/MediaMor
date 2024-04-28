import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdAccountCircle } from 'react-icons/md';
import { GoFileMedia } from "react-icons/go";


const CreatePost = () => {
    const [userDataName, setUserDataName] = useState({});
    const [userDataImage, setUserDataImage] = useState({});
    const [sessionId, setSessionId] = useState(-1);
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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
            textAreaRef.current.style.height = '100px';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [postText]);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
        setPreviewImage(URL.createObjectURL(imageFile));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Add your logic for handling form submission here
            const formData = new FormData();
            formData.append('file', selectedImage);
            
            const response = await axios.post('http://localhost:5555/post/create', {
                text: postText,
                userid: sessionId
            });
            console.log(response)
            const responseimage = await axios.post(`http://localhost:5555/images/upload/${response.data['id']}/${2}`, formData)
            console.log('Post created:', response.data);
            // Reset the post text and selected image after submission
            setPostText('');
            setSelectedImage(null);
            setPreviewImage(null);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleTextChange = (event) => {
        setPostText(event.target.value);
    };

    return (
        <div className='w-full flex border-2 border-gray-700 my-2 p-4 bg-[#F0F0F0]'>
            <div className='mr-4'>
                {/* Render user image here */}
                {userDataImage['Imagepath'] !== -1 ? (
                    <img className='h-9 w-10 rounded-full  border-2 border-black' src={userDataImage['Imagepath']} alt="User" />
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
                            placeholder="Write here all what you think off, dont be racist <3 "
                            value={postText}
                            onChange={handleTextChange}
                        />
                        {previewImage && (
                            <img className="mt-2 mb-2" src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        )}
                        <div className='flex'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }} // Hide the default file input
                            />
                            <button
                                className='mt-2 mr-2 bg-[#41BFB3] text-white p-2 px-4 rounded-3xl font-semibold'
                                type="button" // Change type to "button"
                                onClick={() => inputFileRef.current.click()} // Trigger click on the file input
                            >
                                <GoFileMedia size={25} />
                            </button>
                            <button
                                className='bg-[#41BFB3] mt-2 text-white p-2 px-6 rounded-3xl font-semibold'
                                type="submit"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
