import { BASE_URL } from '@/config/config';
import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { logout } from './userSlice';
import { Navigate } from 'react-router-dom';


const initialState = {
    postDetails: [],
    isLoading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.isLoading = false;
            state.postDetails = action.payload;
            state.error = null;
        },
        fetchPostsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;
            // Find the index of the post to be updated
            const index = state.postDetails.findIndex(post => post._id === updatedPost._id);
            // If the post is found, update it with the new data
            if (index !== -1) {
                state.postDetails[index] = updatedPost;
            }
        },
        updateDeletePost: (state, action) => {
            const updatedPost = action.payload;
            // Find the index of the post to be updated
            const index = state.postDetails.findIndex(post => post._id === updatedPost._id);
            // If the post is found, update it with the new data
            if (index !== -1) {
                state.postDetails.splice(index, 1);
            }
        },
        addPost: (state, action) => {
            const newPost = action.payload;
            //  new comment appended
            state.postDetails = [...state.postDetails, newPost];
        },

        incrementCommentCount: (state,action) => {
            const postId = action.payload;
            state.postDetails.forEach(post => {
                if (postId === post._id) {
                    
                    post.commentCount += 1;
                }
            });
        },
        
        decrementCommentCount: (state, action) => {
            const postId = action.payload;
            state.postDetails.forEach(post => {
                if (postId === post._id) {
                    post.commentCount -= 1;
                }
            });
        },
        



    },
});

export const { incrementCommentCount, decrementCommentCount, fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, updatePost,updateDeletePost } = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const response = await fetch(`${BASE_URL}/post/getAllUserPost`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        const res = await response.json();

        if (res.code === 200) {
            dispatch(fetchPostsSuccess(res.data));
            // toast.success(res.message);
        } else if (res.code === 401) {
            toast.error(res.message);
            dispatch(logout());
            localStorage.removeItem('authToken');
            Navigate('/login');
            // navigate('/login');
            // Handle unauthorized access or redirect to login page
        } else if (res.code === 400) {
            toast.error(res.message);
            // Handle bad request
        }
    } catch (error) {
        console.error('Fetch posts error:', error.message);
        dispatch(fetchPostsFailure(error.message || 'Failed to fetch posts'));
        // toast.error('Failed to fetch posts');
    }
};

export default postSlice.reducer;



