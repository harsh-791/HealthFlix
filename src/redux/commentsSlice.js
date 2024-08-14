import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    comments: JSON.parse(localStorage.getItem('comments')) || [],
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const newComment = {
                id: uuidv4(),
                name: action.payload.name,
                text: action.payload.text,
                date: new Date().toISOString(), // Use ISO format
                replies: [],
            };
            state.comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(state.comments));
        },
        editComment: (state, action) => {
            const comment = state.comments.find(comment => comment.id === action.payload.id);
            if (comment) {
                comment.text = action.payload.text;
                localStorage.setItem('comments', JSON.stringify(state.comments));
            }
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
            localStorage.setItem('comments', JSON.stringify(state.comments));
        },
        addReply: (state, action) => {
            const comment = state.comments.find(comment => comment.id === action.payload.commentId);
            if (comment) {
                const newReply = {
                    id: uuidv4(),
                    name: action.payload.name, // Include the name in the reply
                    text: action.payload.text,
                    date: new Date().toISOString(), // Use ISO format
                };
                comment.replies.push(newReply);
                localStorage.setItem('comments', JSON.stringify(state.comments));
            }
        },
        deleteReply: (state, action) => {
            const { commentId, replyId } = action.payload;
            const comment = state.comments.find(comment => comment.id === commentId);
            if (comment) {
                comment.replies = comment.replies.filter(reply => reply.id !== replyId);
                localStorage.setItem('comments', JSON.stringify(state.comments));
            }
        },
        editReply: (state, action) => {
            const { commentId, replyId, newText } = action.payload;
            const comment = state.comments.find(comment => comment.id === commentId);
            if (comment) {
                const reply = comment.replies.find(reply => reply.id === replyId);
                if (reply) {
                    reply.text = newText;
                    localStorage.setItem('comments', JSON.stringify(state.comments));
                }
            }
        },
    },
});

export const { addComment, editComment, deleteComment, addReply, deleteReply, editReply } = commentsSlice.actions;
export default commentsSlice.reducer;
