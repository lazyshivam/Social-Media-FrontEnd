import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/config/config';
import { addComment, fetchComments, updateComment } from '@/service/commentSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentCard from './CommentCard';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { incrementCommentCount } from '@/service/postSlice';
  
const UserComment = ({ popupRef, postId }) => {
    const [showComment, setShowComment] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const [post,setPost]=useState({})
    console.log(postId,"Hello How are you")

    // useEffect(() => {
       

    //         dispatch(fetchComments());

    // }, [])
    const [formData, setFormData] = useState({
        content: ''
    });
    const [data, setData] = useState([]);
    const commentsData = useSelector((state) => state.comment.commentDetails);
    useEffect(() => {
        let result=commentsData.filter(comment => comment.post === postId)
        setData(result);
    },[commentsData])
    console.log(data);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (formData.content?.trim() === '') {
            toast.error('Comment should not be empty');

            return;
        }
       
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/comment/postComment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                // navigate('/home')
                dispatch(addComment(res.data));
                dispatch(incrementCommentCount(postId));
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
            console.error('Posting comment error:', error);
            toast.error(error.message || 'Post failed');
        } finally {
            setIsLoading(false);
        }
    };

    const OpenPopup = () => {
        setShowComment(!showComment);
    };



    return (
        <Drawer>
            <DrawerTrigger className="hidden" onClick={OpenPopup} ref={popupRef}>Show Comment</DrawerTrigger>
            {/* {showComment && ( */}
             <DrawerContent>
                <div className="fixed h-96 z-50 bottom-0  scrollbar-default overflow-y-auto  left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                Discussion (20)
                            </h2>
                            <DrawerTrigger
                                onClick={OpenPopup}
                                className="p-2 text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 focus:ring-4 focus:outline-none"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                <span className="sr-only">Close</span>
                            </DrawerTrigger>
                        </div>
                        <form className="mb-6" onSubmit={handleCommentSubmit}>
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows="6"
                                    name='content'
                                    value={formData.content}
                                    onChange={handleChange}



                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..."
                                    required
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className=""
                            >
                                {isLoading ? 'Please wait...' : 'Post comment'}
                            </Button>
                        </form>
                        {
                            data?.length>0?(data?.slice().reverse().map((commentItem) => (
                                <div key={commentItem._id}>
                                    <CommentCard commentItem={commentItem } />
                                </div>
                            ))):(
                        <div className="text-center">
                          Oops! No comments to display.
                        </div>
                            )
                        }
                    </div>
                </div>
                </DrawerContent>
           
        </Drawer>
    );
};

export default UserComment;
