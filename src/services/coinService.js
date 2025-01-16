const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

export const fetchCoinHistory = async (coinId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=inr&days=7`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coin history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coin history:', error);
    throw error;
  }
};
  
  // Fetch a single coin by name or symbol
export const fetchCoinByName = async (name) => {
    try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${name}`);
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error fetching coin by name:', error);
    return null;
    }
};
  
