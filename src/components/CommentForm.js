import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentsSlice';
import '../css/base.css';
import '../css/buttons.css';
import '../css/comments.css';
import '../css/replies.css';

const CommentForm = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if name or comment is missing
        if(name==='' && text===''){
            alert('Please enter your name and comment');
            return;
        }else if(name===''){
            alert('Please enter your name');
            return;
        }
        else if(text===''){
            alert('Please enter your comment');
            return;
        }
        // If both are present, dispatch the addComment action
        dispatch(addComment({ name, text }));
        setName('');
        setText('');
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
            />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your comment"
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default CommentForm;
