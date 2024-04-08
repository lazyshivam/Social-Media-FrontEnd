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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Heart, MessageSquareMore, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/config";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "@/service/userProfileSlice";
import { fetchPosts, updateDeletePost, updatePost } from "@/service/postSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserComment from "../UserComment";
import EditPost from "./EditPost";



const UserPostCard = ({post}) => {
    const { _id } = post;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userProfile = useSelector((state) => state.profile.userDetails);
    const [isLiked, setIsLiked] = useState(false);
    // useEffect(() => {
    //     dispatch(fetchPosts());
    // },[dispatch,_id])
    // fetching the post from store to get the imediate changes in post likes and comments
    // const post = useSelector((state) => state.post.postDetails.find(post => post._id === _id));
    const { title, content, image, likes, commentCount, author } = post||{};
    // console.log(post);
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

    const handleDeletePost = async () => {
       
        // setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/post/deletePost/${_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                dispatch(updateDeletePost(res.data));
                navigate('/profile')
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
            console.error('Delete error:', error.message);
            toast.error(error.message || 'Update failed');
        } finally {
            // setIsLoading(false);
        }
    };


    const popupRef = useRef()
    const editPopupRef = useRef();
    const togglePopup = () => {
        popupRef.current.click();
    }

   
    return (
        <>
            <Card className="w-[350px]">
                <CardHeader className="hover:cursor-pointer  hover:bg-slate-200" >
                    <div className="flex flex-1 flex-row justify-between ">
                        <div className="" onClick={() => navigate(`/post/${_id}`)}>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{content}</CardDescription>
                        </div>
                        <Avatar onClick={() => navigate(`/profile`)} >
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
                        <div className="">
                        <Button className="p-2 mr-2" onClick={togglePopup}> <MessageSquareMore /></Button>
                        <p>{commentCount} Comments</p> {/* Display comment count */}
                     
                        </div>
                         <DropdownMenu className="w-24">

                            <DropdownMenuTrigger className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            ><svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                            >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                                <DropdownMenuItem
                                    onClick={() => { editPopupRef.current.click() }}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDeletePost} >Delete</DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardFooter>
            </Card>
            <UserComment popupRef={popupRef} postId={_id} />
            <EditPost post={post} editPopupRef={editPopupRef} />
        </>
    );
};

export default UserPostCard;
