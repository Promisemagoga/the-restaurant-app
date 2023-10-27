import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';


export default function Welcome() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/welcomebg.jpg")} style={styles.bg}>
            <Text style={styles.logoText}>TasteTrail</Text>
                    <Text style={styles.logoParagraph}>Where Food Meets Innovation: Your Perfect Dining Companion.</Text>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.getStartedText}>GET STARTED</Text>
                        {/* <View style={styles.getStartedIcon}>
                            <MaterialCommunityIcons name='greater-than' size={20} color={"#fea70d"} style={styles.icon} />
                        </View> */}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {/* <View style={styles.contentContainer}>
                <View>
                    <Image
                        source={require('../assets/burger.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>Foodhub</Text>
                    <Text style={styles.logoParagraph}>Are you hungry? We promise to serve you on a siver platter</Text>
                </View>
                <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.getStartedText}>GET STARTED</Text>
                    <View style={styles.getStartedIcon}>
                        <MaterialCommunityIcons name='greater-than' size={20} color={"#fea70d"} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBB5C',
        justifyContent: 'center',
      
    },

    bg: {
        flex: 1,
        resizeMode: 'cover',
    },

    contentContainer: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10,
        alignItems: "center",
        marginTop:"auto",
        marginBottom: 20


    },

    logo: {
        width: 250,
        height: 250
    },

    logoText: {
        color: "#fea70d",
        marginTop: 15,
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold",


    },

    getStarted: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#fea70d",
        width: "90%",
        height: 60,

    },

    getStartedText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },

    getStartedIcon: {
        backgroundColor: "#FFF",
        width: 40,
        height: 40,
        borderRadius: 100,
    },

    icon: {
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto"
    },

    logoParagraph: {
        color: "#fff",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 18,
        width: 280,
        marginTop: 10
    }
});