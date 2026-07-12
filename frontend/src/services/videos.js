import api from "./api";

// Get all videos (with optional search and category)
export async function getVideos(search = "", category = "All") {
  const params = {};

  if (search && search.trim() !== "") {
    params.search = search;
  }

  if (category && category !== "All") {
    params.category = category;
  }

  const response = await api.get("/videos", { params });
  return response.data;
}

// Get one video by id
export async function getVideoById(id) {
  const response = await api.get(`/videos/${id}`);
  return response.data;
}

// Create a new video
export async function createVideo(videoData) {
  const response = await api.post("/videos", videoData);
  return response.data;
}

// Update a video
export async function updateVideo(id, videoData) {
  const response = await api.put(`/videos/${id}`, videoData);
  return response.data;
}

// Delete a video
export async function deleteVideo(id) {
  const response = await api.delete(`/videos/${id}`);
  return response.data;
}

// Like a video
export async function likeVideo(id) {
  const response = await api.put(`/videos/${id}/like`);
  return response.data;
}

// Dislike a video
export async function dislikeVideo(id) {
  const response = await api.put(`/videos/${id}/dislike`);
  return response.data;
}
