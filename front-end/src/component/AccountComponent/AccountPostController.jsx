import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../Post';

const AccountPostController = (props) => {
    const AccountId = props.AccountId;
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/user/posts/${AccountId}`);
                setPosts(response.data["id"]);
                console.log(response.data["id"])
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchData();
    }, [AccountId, page]);

    const loadMorePosts = async () => {
        setPage(page + 1);
    };

    return (
        <div className='flex flex-col justify-center'>
            {posts.slice(0,page*6).map((post) => (
                <Post key={post.id} link={post.id}/>
            ))}
            <button onClick={loadMorePosts} className='py-2 px-4 mt-4 bg-gray-800 text-white rounded-md'>Load More Posts</button>
        </div>
    );
};

export default AccountPostController;
