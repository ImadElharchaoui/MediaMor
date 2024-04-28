import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CreateComment from './CreateComment';

import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Comments = (props) => {
    const postId = props.id;
    console.log(postId)
    const [commentIds, setCommentIds] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [Npage, setNpage] = useState(0);
    const NcommentPerpage = 4;


    const fetchData = async()=>{
        try {
            const response = await axios.get(`http://localhost:5555/comment/commentpost/${postId}`);
            console.log(response);
            setCommentIds(response.data["IDs"]);
        } catch (error) {
            console.error('Error fetching comment IDs:', error);
        }
    }

    useEffect(() => {
        
        fetchData();
    }, [postId]);

    const handlePage = (direction) => {
        
        const Ncomments = commentIds.length;
        let NpageMax = commentIds.length / NcommentPerpage ;
        if (commentIds.length % NcommentPerpage !== 0) {
            NpageMax++;
        }
        
        if(direction === 1){
            if(NpageMax > Npage +1){
                console.log("pass down")
                setNpage(Npage+1)
            }
        }else{
            if(Npage > 0){
                console.log("pass Up")
                setNpage(Npage-1)
            }
        }
        
    }

    const handleNewComment = () =>{
        fetchData();
    }

    

    return (
        <div className=' rounded-lg flex flex-col justify-center'>
            <div className=' border-l-2 border-r-2 border-b-2 border-gray-700 flex flex-col justify-center'>
            <button className='py-2' onClick={()=>{setShowComments(!showComments)}}>{showComments ? <p className=''>Hide Comments</p> : <p className=''>Show Comments</p>}</button>
            {showComments && (
            <div className='w-full flex flex-col justify-center'>
                <div onClick={()=>{handlePage(-1)}}  className='w-full flex justify-center border-t-2 border-b-2 border-gray-700 py-2 bg-[#41BFB3] hover:bg-[#2A8C82] active:bg-[#275950]'>
                    <button className='w-full flex justify-center'><FaArrowUp size={20} color='white' /></button>
                </div>
                <div className='pt-4 px-4 bg-[#F0F0F0] flex flex-col justify-center items-center'>
                    {commentIds.slice(Npage * NcommentPerpage , (Npage+1) * NcommentPerpage).map((commentId) => (
                        <Comment key={commentId.id} id={commentId.id}/>
                            
                    ))}
                    <p className=' text-[12px]'>{Npage} pages</p>
                </div>
                <div onClick={()=>{handlePage(1)}} className='w-full flex justify-center border-t-2 border-gray-700 py-2 bg-[#41BFB3] hover:bg-[#2A8C82] active:bg-[#275950]'>
                    <button  className='w-full flex justify-center'><FaArrowDown size={20} color='white' /></button>
                </div>
            </div>)}
            </div>
            <div>
                <CreateComment id={postId} onCreate={handleNewComment}/>
            </div>
        </div>
    );
};

export default Comments;
