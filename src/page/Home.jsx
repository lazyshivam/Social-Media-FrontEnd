import { BASE_URL } from '@/config/config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostCard } from './posts/PostCard';


const Home = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
   const [allPost,setAllPost]=useState([])
  

    const GetAllPost = async (e) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/post/getAllUserPost`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization':`Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                console.log(res);
                setAllPost(res.data);
            
            }
            else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            }
            else if (res.code === 400) {
                toast.error(res.message);
            }


        } catch (error) {
            // Handle error
            console.error('Login error:', error.message);
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetAllPost();
    },[])
  return (
    <div className="flex flex-col h-screen">
  <div className="flex-grow">
    {/* Upper Section - Stories Slider */}
    <div className="bg-gray-100 py-8">
      {/* Insert your slider component here to display stories of following users */}
      {/* Example: <StoriesSlider /> */}
      Upper Section - Stories Slider
    </div>
  </div>
  
  <div className="flex-grow overflow-y-auto bg-white">
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
