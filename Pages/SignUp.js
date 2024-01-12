import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';


export default function SignUp({setIsAuth}) {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function register() {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (authenticated) => {
     
            if (authenticated) {
                const user = JSON.stringify(authenticated);
                await AsyncStorage.setItem("user", user).then(() => {
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
        <ImageBackground source={require("../assets/loginbg.jpg")} style={styles.bg}>
                <View style={styles.backgroundColorCont}>
                    <View style={styles.form}>
                        <Text style={styles.signIn}>SignUp</Text>

                        <TextInput
                            placeholder='Enter email...'
                            placeholderTextColor='#fff'
                            style={styles.textInput}
                            onChangeText={(event) => setEmail(event)}
                        />
                        <TextInput
                            placeholder='Enter password...'
                            style={styles.textInput}
                            onChangeText={(event) => setPassword(event)}
                            placeholderTextColor='#fff'

                        />
                        <TouchableOpacity style={styles.signInBtn} onPress={register}>
                            <Text style={styles.signInBtnText}>REGISTER</Text>
                        </TouchableOpacity>
                        <Text style={styles.newMember}>Do you have an account? <Text style={styles.span} onPress={() => navigation.navigate("SignIn")}>Login</Text></Text>
                    </View>
                </View>
        </ImageBackground>
    
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },

    bg: {
        flex: 1,
        resizeMode: 'cover',
    },

    backgroundColorCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: "100%",

    },

    textInput: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        height: 50,
        width: 300,
        borderRadius: 5,
        paddingLeft: 5,
        color: "#fff",
        fontSize: 20

    },

    form: {
        // backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        height: 400,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        rowGap: 30,
        backgroundColor: 'rgba(30, 30, 30, 0.7)',
        borderRadius: 20,
        // blurRadius: 30,
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
        borderRadius: 5

    },

    signInBtnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },

    signIn: {
        color: "#fff",
        textAlign: "center",
        fontSize: 38,
        fontWeight: "700",

    },

    span: {
        color: "#fea70d"
    },

    newMember: {
        fontSize: 18,
        color: "#fff"
    }

});