import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function BottomNav({ setAuthStatus }) {
  const navigation = useNavigation()

  async function logout() {
    auth.signOut()
    console.log("Successfully signed out");
    await AsyncStorage.removeItem("user")
    setAuthStatus(false)

  }
  return (
    <View style={styles.BottomNav}>
      <MaterialCommunityIcons name='home' size={30} color={"#2F2F2F"} style={styles.icon} onPress={() => navigation.navigate("home")} />
      <MaterialCommunityIcons name='heart' size={30} color={"#2F2F2F"} style={styles.icon} />
      <MaterialCommunityIcons name='cart-variant' size={40} color={"#000"} style={styles.icon} onPress={() => navigation.navigate("cart")} />
      <MaterialCommunityIcons name='logout' size={30} color={"#2F2F2F"} style={styles.icon} onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  BottomNav: {
    marginTop: 20,
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  }

})