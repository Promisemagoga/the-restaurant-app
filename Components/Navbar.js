import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/french-fries.jpg')} style={styles.banner}>
                <View style={styles.navContent}>
                    <MaterialCommunityIcons name='magnify' size={40} color={"#000000"} />
                    <View>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "100" }}>Current location</Text>
                        <View style={styles.greetings}>
                            <MaterialCommunityIcons name='map-marker' size={30} color={"#fea70d"} />
                            <Text style={{ color: "#000", fontSize: 18, }}>Pretoria, ZA</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='cart-variant' size={40} color={"#000"} style={styles.icon} onPress={() => navigation.navigate("cart")} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        marginBottom: 100,
    },
    banner: {
        width: "100%",
        height: 220,
        backgroundColor: "#fea70d",
        alignItems: "center"

    },

    navContent: {
        width: "100%",
       height: 220,
        paddingTop: 70,
        paddingLeft: 20,
        paddingRight:20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    search: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#8293AE",
        width: 280,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 10,


    },

    greetings: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    }

})