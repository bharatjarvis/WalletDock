import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Assuming you are using CoinGecko API to fetch coin history
import axios from 'axios';

const { width } = Dimensions.get('window');

const CoinDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { coinName, coinSymbol, coinImage, coinId } = route.params;

  const [coinHistory, setCoinHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coin history data from API (e.g., CoinGecko)
  const fetchCoinHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=30`
      );
      setCoinHistory(response.data.prices); // Get the prices data
    } catch (error) {
      console.error('Error fetching coin history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinHistory();
  }, [coinId]);

  // Prepare data for Line Chart
  const chartData = {
    labels: coinHistory.map((price, index) => new Date(price[0]).toLocaleDateString()).slice(0, 7), // Date labels for the last 7 days
    datasets: [
      {
        data: coinHistory.map((price) => price[1]).slice(0, 7), // Price data for the last 7 days
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Line color
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Coin Info */}
      <View style={styles.header}>
        <Image source={{ uri: coinImage }} style={styles.coinIcon} />
        <Text style={styles.coinName}>
          {coinName} ({coinSymbol.toUpperCase()})
        </Text>
      </View>

      {/* Price History Graph */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Price History (Last 7 Days)</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <LineChart
            data={chartData}
            width={width - 20} // Screen width minus some padding
            height={220}
            yAxisLabel="₹"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2, // To limit decimal places
              color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
          />
        )}
      </View>

      {/* Back Button */}
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  coinName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
  },
  chartContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#95a5a6',
  },
});

export default CoinDetailScreen;
