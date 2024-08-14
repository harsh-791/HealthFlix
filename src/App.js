import React from 'react';
import './App.css';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

function App() {
    return (
        <div className="App">
            <h1>Comments Section</h1>
            <CommentForm />
            <CommentList />
        </div>
    );
}

export default App;
