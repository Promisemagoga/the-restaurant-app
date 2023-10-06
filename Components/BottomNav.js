import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';



export default function BottomNav() {
  const navigation = useNavigation()
  return (
    <View style={styles.BottomNav}>
    <MaterialCommunityIcons name='home' size={30} color={"#fea70d"} style={styles.icon} onPress={() => navigation.navigate("home")}/>
    {/* <MaterialCommunityIcons name='tray-full' size={30} color={"#fea70d"} style={styles.icon} onPress={() => navigation.navigate("home")}/> */}
    <MaterialCommunityIcons name='heart' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='cart-variant' size={30} color={"#fea70d"} style={styles.icon} />
    <MaterialCommunityIcons name='account' size={30} color={"#fea70d"} style={styles.icon} onPress={() => navigation.navigate("user")}/>
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