import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReply, editReply } from '../redux/commentsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/base.css';
import '../css/buttons.css';
import '../css/comments.css';
import '../css/replies.css';

const Reply = ({ reply, commentId }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(reply.text);

    const handleDeleteReply = () => {
        dispatch(deleteReply({ commentId, replyId: reply.id }));
    };

    const handleEditReply = () => {
        if (isEditing && newText.trim() !== '') {
            dispatch(editReply({ commentId, replyId: reply.id, newText }));
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="reply">
            <div className="reply-header">
                <strong>{reply.name}</strong> <em>{reply.date}</em>
            </div>
            {isEditing ? (
                <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
            ) : (
                <p>{reply.text}</p>
            )}
            <div className="reply-actions">
                <button onClick={handleEditReply}>{isEditing ? 'Save' : 'Edit'}</button>
                <div className="delete-icon-container">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        onClick={handleDeleteReply}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reply;
