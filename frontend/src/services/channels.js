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

// Get all channels
export async function getAllChannels() {
  const response = await api.get("/channels");
  return response.data;
}

// Get channels I subscribed to
export async function getSubscriptions() {
  const response = await api.get("/channels/subscriptions");
  return response.data;
}

// Subscribe to a channel
export async function subscribeChannel(channelId) {
  const response = await api.post(`/channel/${channelId}/subscribe`);
  return response.data;
}

// Unsubscribe from a channel
export async function unsubscribeChannel(channelId) {
  const response = await api.delete(`/channel/${channelId}/subscribe`);
  return response.data;
}

// Check if subscribed
export async function checkSubscription(channelId) {
  const response = await api.get(`/channel/${channelId}/subscribed`);
  return response.data;
}
