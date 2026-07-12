import api from "./api";

// Get comments for a video
export async function getComments(videoId) {
  const response = await api.get(`/comments/${videoId}`);
  return response.data;
}

// Add a comment
export async function addComment(videoId, text) {
  const response = await api.post("/comments", { videoId, text });
  return response.data;
}

// Edit a comment
export async function updateComment(id, text) {
  const response = await api.put(`/comments/${id}`, { text });
  return response.data;
}

// Delete a comment
export async function deleteComment(id) {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
}
