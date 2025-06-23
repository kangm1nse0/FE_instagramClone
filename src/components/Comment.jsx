import React from "react";
import "./Comment.css";

function Comment({ comments, onDelete }) {
  

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li className="comment-list-item" key={comment.id}>
          <span className="comment-list-nickname">익명</span>
          <span className="comment-list-content">{comment.content}</span>
          <button
            className="comment-list-delete-btn"
            onClick={() => onDelete(comment.id)}
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Comment;