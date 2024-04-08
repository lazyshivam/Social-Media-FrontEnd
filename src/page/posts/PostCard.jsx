import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heart, MessageSquareMore, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/config";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "@/service/userProfileSlice";
import { updatePost } from "@/service/postSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserComment from "./UserComment";


const PostCard = (props) => {
    const { _id } = props.post;
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const userProfile = useSelector((state) => state.profile.userDetails);
    const [isLiked, setIsLiked] = useState(false);

    // fetching the post from store to get the imediate changes in post likes and comments
    const post = useSelector((state) => state.post.postDetails.find(post => post._id === _id));
    const { title, content, image, likes, commentCount, author } = post;
    console.log(post);
    useEffect(() => {
        // Check if userProfile and post are available
        if (userProfile && post) {
            // Check if the postId exists in userProfile.postLiked
            const isPostLiked = userProfile.postLiked.some(postIdItem => postIdItem === _id);
            // Update the like state
            setIsLiked(isPostLiked);
        }
    }, [userProfile, post]);

    const handleLikeToggle = async () => {
        try {
            const response = await fetch(`${BASE_URL}/post/toggleLike/${_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                setIsLiked(prevIsLiked => !prevIsLiked); // Toggle the like status
                // Update the Redux store with the new like status
                console.log(res);
                dispatch(updatePost(res.data));
                dispatch(updateProfile(_id));
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
    const popupRef = useRef()
    const togglePopup = () => {
        popupRef.current.click();
    }
    const handleNavigate = (id) => {
        if (id ===userProfile._id) {
            navigate('/profile');
        }
        else {
            navigate(`/authorProfile/${id}`);
        }
    }


    return (
        <>
            <Card className="w-[300px]" >

                <CardHeader className="hover:cursor-pointer  hover:bg-slate-200" >
                    <div className="flex flex-1 flex-row justify-between ">
                        <div className="" onClick={() => navigate(`/post/${_id}`)}>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{content}</CardDescription>
                        </div>
                        <Avatar onClick={()=>handleNavigate(author._id)} >
                            <AvatarImage className="w-12  border shadow-sm rounded-full" src={author?.profilePicture || 'https://github.com/shadcn.png'} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent className="m-0 mb-4 pb-4 p-0" style={{ height: '350px', width: '100%', overflow: 'hidden' }}>
                    <img className="w-full h-full object-cover" src={image || 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg'} alt="PostImage" />
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Button onClick={handleLikeToggle} className={`p-2 ${isLiked ? 'bg-red-600' : ''}`} variant="distructive">
                            <Heart className='text-2xl' />
                        </Button>
                        <p className="ml-2">{likes} Likes</p> {/* Display like count */}
                    </div>
                    <div className="flex items-center">
                        <Button className="p-2 mr-2" onClick={togglePopup}> <MessageSquareMore /></Button>
                        <p>{commentCount} Comments</p> {/* Display comment count */}

                    </div>
                </CardFooter>
            </Card>

            <UserComment popupRef={popupRef} postId={_id} />
        </>
    );
};

export default PostCard;
