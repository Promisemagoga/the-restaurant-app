import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../Config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Navbar() {
    const navigation = useNavigation()

    const [user, setUser] = useState([])
    useEffect(() => {
        console.log("lets see the user:", user);
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const emailA = await getUserAsync();
            if (emailA !== null) {
                const userRef = collection(db, "userData");
                const q = query(userRef, where("userEmail", "==", emailA))
                const querrySnapshot = await getDocs(q)

                if (querrySnapshot.empty) {
                    console.log("Info not found");
                } else {
                    const data = [];
                    querrySnapshot.forEach((doc) => {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });

                    setUser(data);
                }
            } else {
                console.log("No user");
            }
        }
        fetchUser()

    }, [])

    async function getUserAsync() {
        const signedInUser = await AsyncStorage.getItem("user");
        const results = signedInUser !== null ? JSON.parse(signedInUser) : null;
        return signedInUser !== null ? results._tokenResponse.email : null
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maincontauner}>
                <View style={styles.banner}>
                    <View>
                        {user.map((data, index) => (
                            <View key={index}>
                                <Text style={{ color: "#7D7C7C", fontSize: 18, fontWeight: "bold" }}>Hi {data.name}</Text>
                            </View>
                        ))}
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#000" }}>Are you starving?🔥🔥</Text>
                    </View>
                    <View>
                        <View style={{ backgroundColor: "#FF9209", borderRadius: 100, padding: 5 }}>
                            <MaterialCommunityIcons name='account' size={35} color={"#fff"} onPress={() => navigation.navigate("user")} />
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={styles.search}
                        placeholder='Type product name to search...'
                    >
                        <MaterialCommunityIcons name='magnify' size={30} color={"#000000"} />
                    </TextInput>
                </View>
            </View>

            {/* <ImageBackground source={require('../assets/french-fries.jpg')} style={styles.banner}>
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
            </ImageBackground> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        marginBottom: 100,
        padding: 20
    },
    banner: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center"

    },

    maincontauner: {
        width: "100%",
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    navContent: {
        width: "100%",
        height: 220,
        paddingTop: 70,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    search: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#8293AE",
        width: "100%",
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        paddingLeft: 10,


    },

    greetings: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },

    icon: {
        // position: "relative",
        // right:
    }

})