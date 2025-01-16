import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import { fetchCoins, fetchCoinByName } from '../services/coinService'; // assuming coinService.js is set up

const HomePage = ({ navigation }) => {
  const [coinData, setCoinData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetching initial coin data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCoins();
        setCoinData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Function to filter coins based on search query
  const handleSearch = async (query) => {
    setSearchQuery(query);

    // If search query is empty, show all coins
    if (query === '') {
      setFilteredData(coinData);
    } else {
      // First, check if the coin is already in the list
      const existingCoin = coinData.find(
        (coin) => coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase())
      );

      if (existingCoin) {
        // Coin is already in the list, show it
        const filtered = coinData.filter(
          (coin) =>
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        // Coin is not in the list, fetch it from the API
        const fetchedCoin = await fetchCoinByName(query); // Fetch single coin by name or symbol
        if (fetchedCoin) {
          // Add the new coin to the list
          setCoinData((prevData) => [...prevData, fetchedCoin]);
          setFilteredData((prevData) => [...prevData, fetchedCoin]);
        } else {
          // No coin found, show empty filtered list or error message
          setFilteredData([]);
        }
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f1c40f" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a coin..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Coin List */}
      <FlatList
  data={filteredData}
  keyExtractor={(item) => item.id.toString()}  // Ensure that the key is unique (convert to string if necessary)
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CoinDetailScreen', {
        coinId: item.id,
        coinName: item.name,
        coinSymbol: item.symbol,
        coinImage: item.image
      })}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name} ({item.symbol.toUpperCase()})</Text>
          <Text style={styles.priceText}>Price: ₹{item.current_price}</Text>
          {/* 24h Price Change */}
          <Text
            style={[
              styles.priceChange,
              {
                color: item.price_change_percentage_24h > 0 ? '#2ecc71' : '#e74c3c', // Green for positive, Red for negative
              }
            ]}
          >
            24h Change: {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#34495e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 15,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  priceText: {
    fontSize: 16,
    color: '#2ecc71', // Green for price
  },
  priceChange: {
    fontSize: 14,
    color: '#e74c3c', // Red for 24h change
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default HomePage;
