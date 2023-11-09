import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomNav from '../Components/BottomNav'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../Config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfileModal from './EditProfileModal'
import { ImageBackground } from 'react-native'



export default function UserPage() {
    const [user, setUser] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [updateUserInfo, setUpdateUserInfo] = useState("")

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

    function modal(userDetails) {
        setUpdateUserInfo(userDetails)
        setOpenModal(true)
    }


    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.ScrollView}>
                    <ImageBackground source={require('../assets/loginbg2.jpg')} style={styles.banner}>
                        <View style={styles.bannerCon}>

                        </View>
                    </ImageBackground>

                    <View style={styles.profileTop}>
                        <Image source={require("../assets/ppic.png")} style={styles.profilePic} />
                    </View>
                    {user.map((user) => (
                        <View style={styles.profileDetails}>
                            <View style={{ display: "flex", flexDirection: "row", columnGap: 20, alignItems: "center",paddingLeft:20 }}>
                                <MaterialCommunityIcons name='account' size={45} color={"#009687"} onPress={() => navigation.navigate("user")} />
                                <Text style={{ fontSize: 16, fontWeight: "400" }}>{user.name} {user.surname}</Text>
                                <View style={styles.horizontalLine} />
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={{ display: "flex", flexDirection: "row", columnGap: 20, alignItems: "center",paddingLeft:20 }}>
                                <MaterialCommunityIcons name='email' size={45} color={"#009687"} />
                                <Text style={{ fontSize: 16 }}>{user.userEmail}</Text>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={{ display: "flex", flexDirection: "row", columnGap: 20, alignItems: "center",paddingLeft:20 }}>
                                <MaterialCommunityIcons name='phone' size={45} color={"#009687"} />
                                <Text style={{ fontSize: 16 }}>{user.phoneNumber}</Text>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={{ display: "flex", flexDirection: "row", columnGap: 20, alignItems: "center", paddingLeft:20,paddingLeft:20 }}>
                                <MaterialCommunityIcons name='map-marker' size={45} color={"#009687"} />
                                <Text style={{ fontSize: 16 }}>{user.address}</Text>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={{ display: "flex", flexDirection: "row", columnGap: 20, alignItems: "center",paddingLeft:20 }}>
                                <MaterialCommunityIcons name='sticker-check-outline' size={45} color={"#009687"} />
                                <Text style={{ fontSize: 16 }}>My Orders</Text>
                            </View>
                            <View style={styles.horizontalLine} />
                            <TouchableOpacity style={styles.signInBtn} onPress={() => modal(user)}>
                                <Text style={styles.signInBtnText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <BottomNav />
            </SafeAreaView>
            {openModal && <View style={styles.addMod}><EditProfileModal setOpenModal={setOpenModal} updateUserInfo={updateUserInfo} /></View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFFFFF"

    },

    signInBtn: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fea70d',
        width: 230,
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: "auto",
        marginRight:"auto"

    },

    signInBtnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },

    banner: {
        width: "100%",
        height: 180,
    },

    bannerCon: {
        width: "100%",
        height: 180,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    productNav: {
        width: "100%",

        flexDirection: "row-reverse",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "flex-end",

    },
    navHead: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold"
    },

    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 100,
        zIndex: 10,
        marginTop: -30,
        marginRight: "auto",
        marginLeft: 20
    },

    profileTop: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 20
    },

    profileDetails: {
        marginTop: 50

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
        borderBottomColor: '#7D7463"',
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
    },

    addMod: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: "100%",
        height: "100%",
        zIndex: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 250,
        height: 170
    }
})