import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'react-router-dom'

const Confirmation = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
                <Image source={require("../assets/deliver.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                <View>
                    <Text style={{fontWeight:'bold',fontSize:"20px"}}>Thank you!!!</Text>
                    <Text style={{fontWeight:"normal",fontSize:"16px"}}>Your order has been recieved and it will be delivered in 10 - 15 minutes.</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("home")}>
                    <Text style={styles.buttonText}>Back to menu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Confirmation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fea70d",
        width: "90%",
        height: 60,
        marginTop: 'auto',
        marginBottom: '20px'
    },

    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },
})