import { BASE_URL } from '@/config/config';
import React, { useEffect, useMemo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserPostCard from './UserPostCard';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import { fetchPosts } from '@/service/postSlice';

const UserPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    // const userProfile = useSelector((state) => state.profile.userDetails);
    // const userPost=[]
    // useEffect(() => {
    //     dispatch(fetchPosts())
  // },[dispatch])
  const [userPost, setUserPost] = useState([]);
    const allPost = useSelector((state) => state.post.postDetails);
  useEffect(() => {
     const filterData= allPost.filter(post => post?.author._id === id);
    setUserPost(filterData);
     },[dispatch])
   
    if (userPost.length<=0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <Rings
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        );
    }
  
  return (
    <div className="container mx-auto px-4 py-8">
    { userPost?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPost?.map(post => (
          <UserPostCard key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <p>No posts found.</p>
    )}
  </div>
  )
}

export default UserPost