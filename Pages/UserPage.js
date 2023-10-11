import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomNav from '../Components/BottomNav'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../Config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function UserPage() {
    const [user, setUser] = useState()

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
                    querrySnapshot.forEach((doc) => {
                        setUser(doc.data());
                        console.log("see data:", doc.data());
                    })
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

        console.log(results._tokenResponse.email);
        return signedInUser !== null ? results._tokenResponse.email : null
    }

    // if (!user) return (
    //     <View style={styles.container}>
    //         <Text>Loading</Text>
    //     </View>
    // )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <Text style={styles.navHead}>User Details</Text>
                <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} />
            </View>
            <ScrollView style={styles.ScrollView}>
                {user && (
                    <View style={styles.profileTop}>
                        <Image source={require("../assets/Me.jpg")} style={styles.profilePic} />
                        <View style={styles.topContent}>
                            <Text style={{ fontSize: 23, fontWeight: "bold" }}>{user.name} {user.surname}</Text>
                            <View style={styles.detailSection}>
                                <MaterialCommunityIcons name='email' size={25} color={"#fea70d"} />
                                <Text style={{ fontSize: 16 }}>{user.userEmail}</Text>
                            </View>
                            <View style={styles.detailSection}>
                                <MaterialCommunityIcons name='phone' size={25} color={"#fea70d"} />
                                <Text style={{ fontSize: 16 }}>{user.phoneNumber}</Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons name='square-edit-outline' size={30} color={"#fea70d"} />
                    </View>
                )}
                <View style={styles.box}>
                    <View style={styles.OrdersDetail}>
                        <MaterialCommunityIcons name='sticker-check-outline' size={30} color={"#fff"} style={styles.profileIcons} />
                        <Text>My Order</Text>
                    </View>
                    <View style={styles.OrdersDetail}>
                        <MaterialCommunityIcons name='heart' size={30} color={"#fff"} style={styles.profileIcons} />
                        <Text>My Favourites</Text>
                    </View>
                    <View style={styles.OrdersDetail}>
                        <MaterialCommunityIcons name='clipboard-arrow-left' size={30} color={"#fff"} style={styles.profileIcons} />
                        <Text>My Order</Text>
                    </View>
                </View>
                <View style={styles.profileBottom}>
                    <View style={styles.detailbottomContSection}>
                        <MaterialCommunityIcons name='trophy-award' size={45} color={"#7D7463"} />
                        <View>
                            <Text style={styles.heading}>Rewards</Text>
                            <Text style={styles.text}>Get Exciting Rewards</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='greater-than' size={25} style={styles.heading} />
                </View>
                <View style={styles.horizontalLine} />

                <View style={styles.profileBottom}>
                    <View style={styles.detailbottomContSection}>
                        <MaterialCommunityIcons name='sticker-check-outline' size={45} color={"#7D7463"} />
                        <View>
                            <Text style={styles.heading}>Orders</Text>
                            <Text style={styles.text}>Get Exciting Rewards</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='greater-than' size={25} style={styles.heading} />
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.profileBottom}>
                    <View style={styles.detailbottomContSection}>
                        <MaterialCommunityIcons name='map-marker' size={45} color={"#7D7463"} />
                        <View>
                            <Text style={styles.heading}>Address</Text>
                            <Text style={styles.text}>Get Exciting Rewards</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='greater-than' size={25} style={styles.heading} />
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.profileBottom}>
                    <View style={styles.detailbottomContSection}>
                        <MaterialCommunityIcons name='wallet' size={45} color={"#7D7463"} />
                        <View>
                            <Text style={styles.heading}>Wallet</Text>
                            <Text style={styles.text}>Get Exciting Rewards</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='greater-than' size={25} style={styles.heading} />
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.profileBottom}>
                    <View style={styles.detailbottomContSection}>
                        <MaterialCommunityIcons name='bell' size={45} color={"#7D7463"} />
                        <View>
                            <Text style={styles.heading}>Notification</Text>
                            <Text style={styles.text}>Get Exciting Rewards</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name='greater-than' size={25} style={styles.heading} />
                </View>
                <View style={styles.horizontalLine} />
            </ScrollView>
            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF"

    },
    productNav: {
        display: "flex",
        width: "100%",
        height: 80,
        flexDirection: "row-reverse",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 20,
        marginBottom: 50
    },
    navHead: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold"
    },

    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 100
    },

    profileTop: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 20
    },

    detailSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10

    },

    OrdersDetail: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    profileIcons: {
        backgroundColor: "#fea70d",
        padding: 20,
        borderRadius: 100
    },

    box: {
        width: 350,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 50,
        marginBottom: 50,
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto"

    },

    topContent: {
        display: "flex",
        flexDirection: "column",
        rowGap: 10
    },

    profileBottom: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        padding: 20
    },

    detailbottomContSection: {
        display: "flex",
        flexDirection: "row",
        columnGap: 20
    },

    ScrollView: {
        width: "100%"
    },

    horizontalLine: {
        borderBottomColor: '445069',
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    text: {
        color: "#7D7463",
        fontSize: 16
    },

    heading: {
        color: "#2F2F2F",
        fontSize: 20
    }
})