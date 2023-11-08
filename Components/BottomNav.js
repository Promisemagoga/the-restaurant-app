import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';


export default function BottomNav({ setAuthStatus }) {
  const navigation = useNavigation()
  const Tab = createBottomTabNavigator
  async function logout() {
    auth.signOut()
    console.log("Successfully signed out");
    await AsyncStorage.removeItem("user")
    setAuthStatus(false)

  }

  const [activeIcon, setActiveIcon] = useState('home');

  const handleIconClick = (iconName, screenName) => {
    setActiveIcon(iconName);
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.BottomNav}>
      <View style={styles.bottomItems}>
        <MaterialCommunityIcons
          name='cart-variant'
          size={30}
          color={activeIcon === 'cart' ? '#F3EEEA' : '#fff'}
          style={styles.icon}
          onPress={() => handleIconClick('cart', 'cart')}
        />
        <Text style={{color: "#fff"}}>Cart</Text>
      </View>
      <View style={styles.homeCont}>
        <View style={styles.home}>
          <MaterialCommunityIcons
            name='home'
            size={30}
            color={activeIcon === 'home' ? '#F3EEEA' : '#fff'}
            style={styles.icon}
            onPress={() => handleIconClick('home', 'home')}
          />
          {/* <Text>Home</Text> */}
        </View>
      </View>
      <View style={styles.bottomItems}>
        <MaterialCommunityIcons
          name='logout'
          size={30}
          color={activeIcon === 'logout' ? '#fff' : '#fff'}
          style={styles.icon}
          onPress={logout}
        />
        <Text style={{color: "#fff"}}>LogOut</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  BottomNav: {
    backgroundColor: "rgba(255, 146, 9, 0.9)",
    marginTop: 20,
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginTop:50,
    borderRadius:5
  },

  bottomItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight:30
  },

  homeCont:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    bottom: 50,
    backgroundColor: "#fff",
    zIndex: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  
  },

  home: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#FF9209",
    zIndex: 10,
    width: 70,
    height: 70,
    borderRadius: 100,
    padding: 10
  }

})