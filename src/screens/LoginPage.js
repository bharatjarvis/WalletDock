import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//import WalletConnectProvider from '@walletconnect/react-native';

const LoginPage = ({ navigation }) => {
  const handleConnectWallet = async () => {
    try {
      // Example: WalletConnect or MetaMask logic here
      console.log('Connecting wallet...');
      // Navigate to Home page on success
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Coin Dock</Text>
      <Button title="Connect Wallet" onPress={handleConnectWallet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginPage;
