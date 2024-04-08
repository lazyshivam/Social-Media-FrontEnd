import React, { useRef, useState } from 'react';
import moment from 'moment';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { updateComment, updateDeleteComment } from '@/service/commentSlice';
import { decrementCommentCount, updatePost } from '@/service/postSlice';



const CommentCard = ({userProfile, commentItem }) => {
    const editRef = useRef();
    const navigate = useNavigate();
    var canDelete = commentItem.author._id===userProfile._id;

    const [commentText, setCommentText] = useState(commentItem?.content)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (commentText?.trim() === '') {
            toast.error('Comment should not be empty');

            return;
        }
       
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/comment/updateComment/${commentItem._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ content: commentText })
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                // dispatch(res.data);
                dispatch(updateComment(res.data));
                editRef.current.click();
                // console.log(res.data);
                // dispatch(updatePost(res.data));
                // dispatch(updateProfile(_id));
            } else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            } else if (res.code === 400) {
                toast.error(res.message);
            }
        } catch (error) {
            console.error('Comment update error:', error.message);
            toast.error(error.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteComment = async () => {
       
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/comment/deleteComment/${commentItem._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                // dispatch(res.data);
                // console.log(res.data);
                dispatch(updateDeleteComment(res.data));
                // dispatch(updateProfile(_id));
                dispatch(decrementCommentCount());
            } else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            } else if (res.code === 400) {
                toast.error(res.message);
            }
        } catch (error) {
            console.error('Comment delete error:', error.message);
            toast.error(error.message || 'Delete failed');
        } finally {
            setIsLoading(false);
        }
    };







    return (
        <article key={commentItem.id} className="relative p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={commentItem?.author?.profilePicture || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'}
                            alt="Author"
                        />
                        {commentItem?.author?.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span >
                            {moment(commentItem?.updatedAt).format('MMMM Do, YYYY HH:mm:ss')}
                        </span>
                    </p>
                </div>
                <Dialog >
                  
                        <DialogTrigger ref={editRef} className='hidden'>Edit</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-semibold">Edit your comment</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleUpdateSubmit}>
                                {/* Add your form fields here */}
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                        Comment:
                                    </label>
                                    <textarea id="comment" required value={commentText} onChange={(e)=>{setCommentText(e.target.value)}}  name="comment" rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" >
                                    {isLoading?'Updating...':'Submit'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
    
                </Dialog>
               {canDelete&& <DropdownMenu className="w-24">

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
                        <DropdownMenuItem onClick={() => { editRef.current.click() }}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteComment} >Delete</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>}

            </footer>
            <p className="text-gray-500 dark:text-gray-400">{commentItem?.content}</p>
            <div className="flex items-center mt-4 space-x-4">
                <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                    <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                    </svg>
                    Reply
                </button>
            </div>
        </article>
    );
};

export default CommentCard;
