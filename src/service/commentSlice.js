import { BASE_URL } from '@/config/config';
import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { logout } from './userSlice';
import { Navigate } from 'react-router-dom';

const initialState = {
    commentDetails: [],
    isLoading: false,
    error: null,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        fetchCommentsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCommentsSuccess: (state, action) => {
            state.isLoading = false;
            state.commentDetails = action.payload;
            state.error = null;
        },
        fetchCommentsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addComment: (state, action) => {
            const newComment = action.payload;
            //  new comment appended
            state.commentDetails = [...state.commentDetails, newComment];
        },
        updateComment: (state, action) => {
            const updatedComment = action.payload;
            // Find the index of the post to be updated
            const index = state.commentDetails.findIndex(comment => comment._id === updatedComment._id);
            // If the post is found, update it with the new data
            if (index !== -1) {
                state.commentDetails[index] = updatedComment;
            }
        },
        updateDeleteComment: (state, action) => { 
            const updatedComment = action.payload;
             // Find the index of the post to be updated
             const index = state.commentDetails.findIndex(comment => comment._id === updatedComment._id);
             // If the post is found, update it with the new data
             if (index !== -1) {
                state.commentDetails.splice(index, 1);
             }
        }
    },
});

export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure,updateComment,updateDeleteComment,addComment } = commentSlice.actions;

export const fetchComments = () => async (dispatch) => {
    dispatch(fetchCommentsStart());
    try {
        const response = await fetch(`${BASE_URL}/comment/getAllComment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        const res = await response.json();

        if (res.code === 200) {
            dispatch(fetchCommentsSuccess(res.data));
            // toast.success(res.message);
        } else if (res.code === 401) {
            // toast.error(res.message);
            dispatch(logout());
            localStorage.removeItem('authToken');
            Navigate('/login');
            // navigate('/login');
            // Handle unauthorized access or redirect to login page
        } else if (res.code === 400) {
            console.log(res.message)
        }
    } catch (error) {
        console.error('Fetch posts error:', error.message);
        dispatch(fetchCommentsFailure(error.message || 'Failed to fetch posts'));
       
    }
};

export default commentSlice.reducer;



