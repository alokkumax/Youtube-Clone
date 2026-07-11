import { useState } from "react";
import { getUser } from "../services/auth";
import "../styles/comments.css";

function Comments() {
  // Store all comments in state
  const [comments, setComments] = useState([]);

  // Text for new comment input
  const [newComment, setNewComment] = useState("");

  // Track which comment is being edited
  const [editingId, setEditingId] = useState(null);

  // Text for edit input
  const [editText, setEditText] = useState("");

  // Add a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }

    const loggedInUser = getUser();
    const username = loggedInUser ? loggedInUser.username : "Guest";

    const comment = {
      id: Date.now().toString(),
      username: username,
      text: newComment,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  // Delete a comment by id
  const handleDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  // Start editing a comment
  const handleStartEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  // Save edited comment
  const handleSaveEdit = (commentId) => {
    if (editText.trim() === "") {
      return;
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, text: editText };
      }
      return comment;
    });

    setComments(updatedComments);
    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="comments-section">
      <h2 className="comments-title">Comments</h2>

      {/* Add new comment */}
      <div className="add-comment">
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-btn" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>

      {/* Comments list */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              {editingId === comment.id ? (
                <div className="edit-comment">
                  <input
                    type="text"
                    className="comment-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="comment-btn"
                    onClick={() => handleSaveEdit(comment.id)}
                  >
                    Save
                  </button>
                  <button
                    className="comment-btn cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="comment-username">{comment.username}</p>
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-actions">
                    <button
                      className="comment-btn"
                      onClick={() => handleStartEdit(comment)}
                    >
                      Edit
                    </button>
                    <button
                      className="comment-btn delete-btn"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
