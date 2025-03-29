
const API_URL = 'http://localhost:5000/api';

export const fetchAuctions = async () => {
  try {
    const response = await fetch(`${API_URL}/auctions`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
};

export const fetchAuctionById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/auctions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch auction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching auction:', error);
    throw error;
  }
};

export const createAuction = async (auctionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/auctions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(auctionData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create auction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating auction:', error);
    throw error;
  }
};

export const placeBid = async (auctionId, amount) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/auctions/${auctionId}/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to place bid');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
};
