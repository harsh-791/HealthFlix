import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply } from '../redux/commentsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Reply from './Reply';
import '../css/base.css';
import '../css/buttons.css';
import '../css/comments.css';
import '../css/replies.css';

// Custom function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                   day % 10 === 2 && day !== 12 ? 'nd' :
                   day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    const options = { month: 'short', year: 'numeric' };
    const monthYear = date.toLocaleDateString('en-GB', options);

    return `${day}${suffix} ${monthYear}`;
};

const Comment = ({ comment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(comment.text);
    const [replyText, setReplyText] = useState('');
    const [replyName, setReplyName] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        if (isEditing && newText.trim() !== '') {
            dispatch(editComment({ id: comment.id, text: newText }));
        }
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        dispatch(deleteComment(comment.id));
    };

    const handleAddReply = () => {
        if (replyText.trim() !== '' && replyName.trim() !== '') {
            dispatch(addReply({ commentId: comment.id, name: replyName, text: replyText }));
            setReplyText('');
            setReplyName('');
            setShowReplyForm(false);
        }
    };

    return (
        <div className="comment">
            <div className="comment-section">
                <div className="comment-header">
                    <strong>{comment.name}</strong> <em>{formatDate(comment.date)}</em>
                    <div className="delete-icon-container">
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            onClick={handleDelete}
                        />
                    </div>
                </div>
                {isEditing ? (
                    <textarea value={newText} onChange={(e) => setNewText(e.target.value)} />
                ) : (
                    <p>{comment.text}</p>
                )}
                <div className="buttons-section">
                    <div className="reply-section">
                        {showReplyForm ? (
                            <>
                                <input
                                    type="text"
                                    value={replyName}
                                    onChange={(e) => setReplyName(e.target.value)}
                                    placeholder="Your name"
                                />
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write a reply..."
                                />
                                <button onClick={handleAddReply}>Reply</button>
                                <button onClick={() => setShowReplyForm(false)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setShowReplyForm(true)}>Reply</button>
                        )}
                    </div>
                    <div className="comment-actions">
                        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
                    </div>
                </div>
            </div>
            {comment.replies && comment.replies.map(reply => (
                <Reply key={reply.id} reply={reply} commentId={comment.id} />
            ))}
        </div>
    );
};

export default Comment;
