
import apiClient from './apiClient';

// Get all auctions
export const getAllAuctions = async () => {
  try {
    const response = await apiClient.get('/auctions');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch auctions');
  }
};

// Get auction by ID
export const getAuctionById = async (id) => {
  try {
    const response = await apiClient.get(`/auctions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch auction');
  }
};

// Place a bid on an auction
export const placeBid = async (auctionId, amount) => {
  try {
    const response = await apiClient.post(`/auctions/${auctionId}/bid`, { amount });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to place bid');
  }
};

// Create a new auction
export const createAuction = async (auctionData) => {
  try {
    const response = await apiClient.post('/auctions', auctionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create auction');
  }
};
