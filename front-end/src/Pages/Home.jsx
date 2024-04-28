import React from 'react'
import Navbar from '../component/Navbar.jsx'
import Post from '../component/Post.jsx'
import CreatePost from '../component/CreatePost.jsx'
import ImageAd1 from '../Images/AD1.jpg'
import ImageAd2 from '../Images/AD2.jpg'
import ImageAd3 from '../Images/AD3.jpg'
export const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='flex justify-between'>
          <div className='w-1/4'>
              Other content here
          </div>
          <div className='w-1/2 px-2'>
            <CreatePost />
            <Post link={1} />
          </div>
          <div className='w-1/4 px-2 py-2'>
            <img className='my-2' src={ImageAd1}/>
            <img className='my-2' src={ImageAd2}/>
            <img className='my-2' src={ImageAd3}/>
          </div>
        </div>
        
    </div>
  )
}
export default Home
