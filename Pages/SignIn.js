import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';




export default function SignIn({ setIsAuth }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation()

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (authenticated) => {

                if (authenticated) {
                    const user = JSON.stringify(authenticated);
                    await AsyncStorage.setItem("user", user).then(() => {
                    })
                    console.log("User Successfully logged in");
                    setIsAuth(true)
                }

            }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    alert("No user found with this email")
                } else if (error.code === "auth/wrong-password") {
                    alert("Incorrect password")
                } else {
                    alert(error)

                }
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/loginbg.jpg")} style={styles.bg}>
                <BlurView intensity={10} >
                    <View style={styles.backgroundColorCont}>
                        <View style={styles.form}>
                            <Text style={styles.signIn}>SignIn</Text>

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
                            <TouchableOpacity style={styles.signInBtn} onPress={login}>
                                <Text style={styles.signInBtnText}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={styles.newMember}>New to TasteTrail? <Text style={styles.span} onPress={() => navigation.navigate("SignUp")}>Register</Text></Text>
                        </View>
                    </View>
                </BlurView>
            </ImageBackground>
            {/* <View style={styles.loginContainer}>
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
                <TouchableOpacity style={styles.signInBtn} onPress={login}>
                    <Text style={styles.signInBtnText}>SignIn</Text>
                </TouchableOpacity>
                <Text style={styles.newMember}>New to Foodhub? <Text style={styles.span} onPress={() => navigation.navigate("SignUp")}>signUp</Text></Text>
            </View> */}
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