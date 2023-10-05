import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';


export default function Welcome() {

    const navigation = useNavigation()
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View>
                    <Image
                        source={require('../assets/burger.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>Foodhub</Text>
                    <Text style={styles.logoParagraph}>Are you hungry? We promise to serve you on a siver platter</Text>
                </View>
                <TouchableOpacity style={styles.getStarted} onPress={() => navigation.navigate("cat6")}>
                    <Text style={styles.getStartedText}>GET STARTED</Text>
                    <View style={styles.getStartedIcon}>
                        <MaterialCommunityIcons name='greater-than' size={20} color={"#fea70d"} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBB5C',
        justifyContent: 'center',
    },

    contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 100
    },

    logo: {
        width: 250,
        height: 250
    },

    logoText: {
        marginTop: 15,
        textAlign: "center",
        fontSize: 48,
        fontWeight: "700",

    },

    getStarted: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-around",
        // marginTop: 80,
        backgroundColor: '#fea70d',
        width: 230,
        height: 60,
        borderRadius: 30

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

    logoParagraph:{
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: 200,
        marginTop: 10
    }
});