import { useState, useEffect } from "react";
import { getUser } from "../services/auth";
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/comments";
import "../styles/comments.css";

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const loggedInUser = getUser();

  // Load comments from backend
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments(videoId);
        setComments(data);
      } catch (error) {
        setComments([]);
      }
    };

    if (videoId) {
      loadComments();
    }
  }, [videoId]);

  // Add a new comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }

    if (!loggedInUser) {
      alert("Please login to comment");
      return;
    }

    try {
      const comment = await addComment(videoId, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment");
    }
  };

  // Delete a comment
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete comment");
    }
  };

  // Start editing a comment
  const handleStartEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  // Save edited comment
  const handleSaveEdit = async (commentId) => {
    if (editText.trim() === "") {
      return;
    }

    try {
      const updated = await updateComment(commentId, editText);
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return updated;
        }
        return comment;
      });
      setComments(updatedComments);
      setEditingId(null);
      setEditText("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to edit comment");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const userLetter = loggedInUser
    ? loggedInUser.username.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="comments-section">
      {/* Comment count header like YouTube */}
      <div className="comments-header">
        <h2 className="comments-title">{comments.length} Comments</h2>
        <button type="button" className="sort-btn">
          ⇅ Sort by
        </button>
      </div>

      {/* Add comment row with avatar */}
      <div className="add-comment">
        <div className="comment-avatar">{userLetter}</div>
        <div className="add-comment-right">
          <input
            type="text"
            className="comment-input"
            placeholder={
              loggedInUser ? "Add a comment..." : "Login to add a comment"
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment();
              }
            }}
          />
          <div className="add-comment-actions">
            <button
              type="button"
              className="comment-cancel"
              onClick={() => setNewComment("")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="comment-btn"
              onClick={handleAddComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Be the first to comment.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-avatar">
                {comment.username
                  ? comment.username.charAt(0).toUpperCase()
                  : "?"}
              </div>

              <div className="comment-body">
                {editingId === comment._id ? (
                  <div className="edit-comment">
                    <input
                      type="text"
                      className="comment-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="add-comment-actions">
                      <button
                        type="button"
                        className="comment-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="comment-btn"
                        onClick={() => handleSaveEdit(comment._id)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="comment-username">
                      @{comment.username}
                      <span className="comment-time"> · just now</span>
                    </p>
                    <p className="comment-text">{comment.text}</p>

                    <div className="comment-actions">
                      <button type="button" className="comment-icon-btn">
                        👍
                      </button>
                      <button type="button" className="comment-icon-btn">
                        👎
                      </button>
                      <button type="button" className="comment-reply-btn">
                        Reply
                      </button>

                      {loggedInUser &&
                        String(loggedInUser.userId) ===
                          String(comment.userId) && (
                          <>
                            <button
                              type="button"
                              className="comment-reply-btn"
                              onClick={() => handleStartEdit(comment)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="comment-reply-btn delete-text"
                              onClick={() => handleDelete(comment._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
