import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function BottomNav() {
  return (
    <View style={styles.BottomNav}>
    <MaterialCommunityIcons name='home' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='tray-full' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='heart' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='cart-variant' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='account' size={30} color={"#fea70d"} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
    BottomNav:{
        marginTop: 20,
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
       justifyContent: "space-between",
       padding: 10,
    }

})