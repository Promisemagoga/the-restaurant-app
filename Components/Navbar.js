import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Navbar() {
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <View style={styles.navContent}>
                    <View style={styles.greetings}>
                    <MaterialCommunityIcons name='map-marker' size={30} color={"#fff"} />
                    <View>
                        <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}>Hi, Promise</Text>
                    <Text style={{color: "#fff", fontSize: 16,}}>Pretoria, ZA</Text>
                    </View>
                    </View>
                    <MaterialCommunityIcons name='menu' size={30} color={"#fff"} />
                </View>
                <TextInput
                 style={styles.search}
                 placeholder='Type product name to search...'
                 >
                <MaterialCommunityIcons name='magnify' size={30} color={"#000000"} />
                </TextInput>
            </View>
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
    navBar: {
        width: "100%",
        height: 200,
        backgroundColor: "#fea70d",
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        alignItems: "center"

    },

    navContent: {
        width: "100%",
        marginTop: 50,
        padding: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
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

    greetings:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20,
    }

})