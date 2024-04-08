import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, updatePost } from '@/service/postSlice';
import { updateProfile } from '@/service/userProfileSlice';
import { toast } from 'react-toastify';
import { BASE_URL } from '@/config/config';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquareMore } from 'lucide-react';
import { Rings } from 'react-loader-spinner';

const PostDetails = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [post,setPost]=useState({})

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, postId])

    const userProfile = useSelector((state) => state.profile.userDetails);
    // console.log(userProfile);

    // fetching the post from store to get the imediate changes in post likes and comments
    const post = useSelector((state) => state.post.postDetails.find(post => post?._id === postId));
    // console.log(post)
    const isLoading = useSelector((state) => state.post.isLoading);

    const [isLiked, setIsLiked] = useState();
    useEffect(() => {
        // Check if userProfile and post are available
        if (userProfile && post) {
            // Check if the postId exists in userProfile.postLiked
            const isPostLiked = userProfile.postLiked.some(postIdItem => postIdItem === postId);
            // Update the like state
            // console.log(post);
        
            setIsLiked(isPostLiked);
        }
    }, [userProfile, post, isLiked, postId]);


    const { title, content, image, likes, comments } = post || {};
    const handleLikeToggle = async () => {
        try {
            const response = await fetch(`${BASE_URL}/post/toggleLike/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                setIsLiked(prevIsLiked => !prevIsLiked);// Toggle the like status
                // Update the Redux store with the new like status
                // console.log(res);
                dispatch(updatePost(res.data));
        
            dispatch(updateProfile(postId));
            } else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            } else if (res.code === 400) {
                toast.error(res.message);
            }
        } catch (error) {
            console.error('Like error:', error.message);
            toast.error(error.message || 'Like failed');
        }
    };

    if (isLoading) {
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
        <div className="container mx-auto">
            <h1>Hello from details card {postId}</h1>
            {/* Post Section */}
            <div className="my-8">
                <Card className="w-[350px]" >
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{content}</CardDescription>
                    </CardHeader>
                    <CardContent className="m-0 min-h-56 mb-4 pb-4 p-0">
                        <img src={image || 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg'} alt="PostImage" />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Button onClick={handleLikeToggle} className={`p-2 ${isLiked ? 'bg-red-600' : ''}`} variant="distructive">
                                <Heart className='text-2xl' />
                            </Button>
                            <p className="ml-2">{likes} Likes</p>
                        </div>
                        <div className="flex items-center">
                            <Button className="p-3 mr-2" onClick={() => navigate('/post')}> <MessageSquareMore />
                            </Button>
                            <p>{comments?.length} Comments</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Comments Section */}
            <div className="my-8">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                {comments?.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="border border-gray-300 p-4 rounded mb-4">
                            <p className="text-gray-700">{comment.content}</p>
                            <p className="text-gray-500 mt-2">By: {comment.author}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
