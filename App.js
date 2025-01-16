import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/screens/LoginPage';
import HomePage from './src/screens/HomePage';
import CoinDetailScreen from './src/screens/CoinDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome Bharat' }} />
        <Stack.Screen name="CoinDetailScreen" component={CoinDetailScreen} options={{ title: 'Coin Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
