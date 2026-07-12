import api from "./api";

// Create a new channel
export async function createChannel(channelData) {
  const response = await api.post("/channel", channelData);
  return response.data;
}

// Get channel by id
export async function getChannelById(id) {
  const response = await api.get(`/channel/${id}`);
  return response.data;
}

// Get logged in user's channels
export async function getMyChannels() {
  const response = await api.get("/channels/me");
  return response.data;
}
