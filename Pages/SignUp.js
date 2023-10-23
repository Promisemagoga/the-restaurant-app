import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp({setIsAuth}) {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function register() {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (authenticated) => {
     
            if (authenticated) {
                const user = JSON.stringify(authenticated);
                await AsyncStorage.setItem("users", user).then(() => {
                    console.log("saved")
                })
                console.log("User Successfully registered");
                navigation.navigate("profile")
            }

        })
            .catch((error) => {
                console.log(error);
            })
    }



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
                        onChangeText={(event) => setEmail(event)}
                    />
                    <TextInput
                        placeholder='Enter password...'
                        style={styles.textInput}
                        onChangeText={(event) => setPassword(event)}


                    />
                </View>
                <TouchableOpacity style={styles.signInBtn} onPress={register}>
                    <Text style={styles.signInBtnText}>SignUp</Text>
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

    textInput: {
        borderBottomWidth: 1,
        width: 300
    },

    form: {
        display: "flex",
        flexDirection: "column",
        rowGap: 30
    },

    loginContainer: {
        display: "flex",
        flexDirection: "column",
        rowGap: 50,
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

    span: {
        color: "#fea70d"
    },

    newMember: {
        fontSize: 19
    }

});