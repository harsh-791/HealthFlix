import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment';
import '../css/base.css';
import '../css/buttons.css';
import '../css/comments.css';
import '../css/replies.css';

// Function to parse date strings and handle potential parsing errors
const parseDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate) ? new Date() : parsedDate;
};

// Function to format date to '2nd Aug 2024'
const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                   day % 10 === 2 && day !== 12 ? 'nd' :
                   day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return `${day}${suffix} ${formattedDate.replace(/\d+/, '').trim()}`;
};

const CommentList = () => {
    const [sortOrder, setSortOrder] = useState('desc'); // Default to descending order
    const comments = useSelector((state) => state.comments.comments);

    // Sort comments by date based on sortOrder
    const sortedComments = [...comments].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Toggle sorting order
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="comment-list">
            <div className="sort-container">
                <span className="sort-label">Sort By: Date and Time</span>
                <button onClick={handleSort} className="sort-button">
                    <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />
                </button>
            </div>
            {sortedComments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
