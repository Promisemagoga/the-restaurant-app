import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native'

export default function App() {
  return (
  <StripeProvider publishableKey = 'pk_test_51O2tpGJO3slUdWuEQeuNuPWw12Qboho3j4fwajI5YOMjlvrE2w8J0yViNKGNeBRtnn8iqduOIoBBUrdkepOqfWjv00lq3fT9p5'>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  </StripeProvider>

  );
}


