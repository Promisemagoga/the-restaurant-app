import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const [listCart, setListCart] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const fetchCartItems = async () => {
            setListCart([])
            const userId = await getUserAsync();
            console.log(userId);
            const itemRef = doc(collection(db, "carts"), userId);
            // const q = query(itemRef, where("item", "==", "itemId"))
            const querrySnapshot = await getDoc(itemRef);

            if (!querrySnapshot.exists()) {
                console.log("Info not found");
            } else {
                var cartItems = []
                // console.log("see data:", querrySnapshot.data());
                await querrySnapshot.data().item.forEach(async (doc) => {
                    var item = await getItemFromFirestor(doc.itemId);
                    console.log("item", item);
                    cartItems.push(item);
                    setListCart((prevArray) => [...prevArray, item])
                })
                // if (cartItems.length > 0) {
                // console.log("see dat1a:", cartItems);
                // }
            }
        }
        fetchCartItems()
    }, [])

    async function getUserAsync() {
        const signedInUser = await AsyncStorage.getItem("user");
        const results = signedInUser !== null ? JSON.parse(signedInUser) : null;

        console.log("see user object", results._tokenResponse.localId);
        // console.log("see user object",results);
        return signedInUser !== null ? results._tokenResponse.localId : null
    }

    async function getItemFromFirestor(id) {
        const itemRef = doc(collection(db, "items"), id);
        // const q = query(itemRef, where("item", "==", "itemId"))
        const querrySnapshot = await getDoc(itemRef);
        var item = null
        if (querrySnapshot.exists()) {
            item = querrySnapshot.data();
        }
        // console.log(item);
        return item
    }

    if (!listCart) { return <Text>Loadin...</Text> }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <Text style={styles.navHead}>Cart</Text>
                <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")} />
            </View>
            <ScrollView>
                {listCart.map((data, index) => (
                    <View style={styles.ScrollView}>
                        <View style={styles.box}>
                            <View style={styles.contentTop}>
                                <Text style={styles.description}>{data.description}</Text>
                                <Image source={{ uri: data.imgUrl }} style={styles.img} />
                            </View>
                            <View>
                                <Text style={styles.price}>{data.price}</Text>
                            </View>
                            <View style={styles.contentBottom}>
                                <MaterialCommunityIcons name='delete' size={25} color={"#2F2F2F"} style={styles.remove} />
                                <View style={styles.quantity}>
                                    <MaterialCommunityIcons name='minus-circle' size={30} color={"#fea70d"} onPress={() => navigation.navigate("home")} />
                                    <Text style={{ fontSize: 20 }}>2</Text>
                                    <MaterialCommunityIcons name='plus-circle' size={30} color={"#fea70d"} />
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                {console.log("listCart", listCart)}

            </ScrollView>
            <View style={styles.checkoutContainer}>
                <Text style={styles.heading}>Bill Details</Text>
                <View style={styles.checkOutContent}>
                    <Text>Subtotal</Text>
                    <Text>R500</Text>
                </View>
                <View style={styles.checkOutContent}>
                    <Text>Delivery Charge</Text>
                    <Text>R0</Text>
                </View>
                <View style={styles.hr}></View>
                <TouchableOpacity style={styles.displayButton}>
                    <Text>3 Items |</Text>
                    <View style={styles.checkOut}>
                        <Text style={styles.text}>CheckOut</Text>
                        <MaterialCommunityIcons name='greater-than' size={30} color={"#fff"} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    box: {
        width: 350,
        height: 250,
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
        margin: 5,
        padding: 20
    },

    ScrollView: {
        width: "100%",
        padding: 20,
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

    contentTop: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20

    },

    navHead: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "bold"
    },
    img: {
        width: 150,
        height: 100,
        borderRadius: 10
    },

    contentBottom: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    description: {
        width: 150,
        fontSize: 18,
    },

    addBtn: {
        borderWidth: 1,
        width: 150,
        height: 35,
        borderRadius: 10,
        borderColor: "#fea70d"
    },

    addBtnText: {
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
        color: "#fea70d"
    },

    price: {
        color: "#009687",
        fontWeight: "bold",
        fontSize: 22
    },

    name: {
        color: "#009687",
    },
    quantity: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10
    },

    remove: {
        backgroundColor: "#fea70d",
        padding: 5,
        borderRadius: 100
    },


    displayButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "#fea70d",
        height: 50

    },

    checkOut: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,

    },

    checkOutContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        padding: 10
    },

    checkoutContainer: {
        width: "90%",
        marginTop: "auto",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: '#fea70d',
        // padding: 10,
        margin: 20
    },

    text: {
        color: "#fff",
        fontSize: 20
    },

    heading: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: "bold"
    }


});