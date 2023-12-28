// import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";

export default function Confirmation() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secContainer}>
                <Image source={require("../assets/deliver.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                <View style={styles.typCont}>
                    <Text style={styles.heading}>Thank you!!!</Text>
                    <Text style={styles.paragraph}>Your order has been recieved and it will be delivered in 10 - 15 minutes.</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("home")}>
                    <Text style={styles.buttonText}>Back to menu</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%"
    },

    secContainer: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "red",
        height: "50%",
        width: "100%"
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    paragraph: {
        width: "80%",
        textAlign: 'center',
        fontWeight: '300'
    },

    typCont: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        height: "30%",
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'center',
        // backgroundColor: 'yellow'
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fea70d",
        width: "50%",
        height: 60,
        borderRadius: 100,
        marginTop: 40,
        marginBottom: '20px'
    },

    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19,
        // textTransform: 'capitalize'
    },
})