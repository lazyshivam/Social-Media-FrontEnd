import { BASE_URL } from '@/config/config';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostCard from './posts/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/service/postSlice';
import { Rings } from 'react-loader-spinner';

import { motion } from "framer-motion"


const Home = () => {

    // const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    // const [allPost, setAllPost] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);


    const isLoading = useSelector((state) => state.post.isLoading);
    const allPost = useSelector((state) => state.post.postDetails) || [];
    // const allPost = [];
    const stories = [
        { id: 1, userPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', username: 'User1' },
        { id: 2, userPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', username: 'User2' },
        { id: 3, userPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', username: 'User3' },
        { id: 4, userPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', username: 'User4' },
        { id: 5, userPic: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', username: 'User5' },
    ];

    const [allUserStory, setAllUserStory] = useState([]);
    const GetAllFollowingUserStory = async () => {

        // setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/story/getAllStory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                setAllUserStory(res.data);


            }
            else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            }
            else if (res.code === 400) {
               console.log(res.message);
            }


        } catch (error) {
            // Handle error
            console.error('Update error:', error.message);
            // toast.error(error.message || 'Update failed');
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        GetAllFollowingUserStory();
    }, [])
    console.log(allUserStory, "Log from home page")

    console.log(allPost)
    if (isLoading) {
        return (
            <div className="flex justify-center  items-center h-screen">
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
    
    const Story = ({ userPic, username }) => {
        return (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-20 h-20 rounded-full overflow-hidden mx-2 md:mx-4"
          >
            <img src={userPic||'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'} alt={`User ${username}`} className="w-full h-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 text-center text-white font-bold text-xs py-1 bg-gray-800 opacity-75">
              {username}
            </span>
          </motion.div>
        );
      };
    return (
        <div className="flex max-w-[1250px] h-screen flex-col scrollbar-default">
            <div className="flex-grow flex items-center justify-center bg-yellow-100">
                {allUserStory?.length===0 && <div className='text-center text-neutral-700'>No story to display</div>}
                <div className="overflow-x-auto flex items-center py-4">
                    {allUserStory?.map(story => (
                        <Story key={story._id} userPic={story.author.profilePicture} username={story.author.username} />
                    ))}
                </div>
                
            </div>

            <div className="flex-grow scrollbar-hide overflow-y-auto bg-white">
                {allPost.length === 0 && <div className='text-center'>No post to display,Please! create a post <br /> <span className='text-red-400 text-xs'>Please create your profile first if you have not created your profile yet. <Link className='text-blue-400 text-sm underline' to='/profile'>Go to your profile
                </Link></span></div>}
                {/* Bottom Section - All Posts */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 px-4">
                    {allPost?.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
