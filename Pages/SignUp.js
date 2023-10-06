import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.loginContainer}>
    <Text style={styles.signIn}>SignUp</Text>
    <Image
        source={require("../assets/login.png")}
    />
    <View style={styles.form}>
        <TextInput
            placeholder='Enter email...'
            style={styles.textInput}
        />
        <TextInput
            placeholder='Enter password...'
            style={styles.textInput}

        />
    </View>
    <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.signInBtnText}  onPress={() => navigation.navigate("user")}>SignUp</Text>
    </TouchableOpacity>
    <Text style={styles.newMember}>Already have an account? <Text style={styles.span} onPress={() => navigation.navigate("SignIn")}>signIn</Text></Text>
    </View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        borderBottomWidth: 1,
        width: 300
    },

    form:{
        display: "flex",
        flexDirection: "column",
        rowGap: 30
    },

    loginContainer:{
        display: "flex",
        flexDirection: "column",
        rowGap : 50,
        alignItems: "center"
    },

    signInBtn: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#fea70d',
        width: 230,
        height: 40,
        borderRadius: 30

    },

    signInBtnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },

    signIn: {
        textAlign: "center",
        fontSize: 48,
        fontWeight: "700",

    },

    span:{
        color: "#fea70d"
    },

    newMember:{
        fontSize: 19
    }

});