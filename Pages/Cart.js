import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const [listCart, setListCart] = useState([])
    const navigation = useNavigation()
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const fetchCartItems = async () => {
            setListCart([])
            const userId = await getUserAsync();
            const itemRef = doc(collection(db, "carts"), userId);
            const querrySnapshot = await getDoc(itemRef);

            if (!querrySnapshot.exists()) {
                console.log("Info not found");
            } else {
                var cartItems = [];
                await Promise.all(querrySnapshot.data().item.map(async (doc) => {
                    var item = await getItemFromFirestor(doc.itemId);
                    cartItems.push({ ...item, itemQuantity: 1 });
                }));
                let finalPrice = 0
                cartItems.forEach(cart => {
                    finalPrice += parseInt(cart.price)
                });
                // console.log(finalPrice);
                setTotalPrice(finalPrice)
                setListCart(cartItems)
            }
        }
        fetchCartItems()
    }, [])

    async function getUserAsync() {
        const signedInUser = await AsyncStorage.getItem("user");
        const results = signedInUser !== null ? JSON.parse(signedInUser) : null;

        console.log("see user object", results._tokenResponse.localId);
        return signedInUser !== null ? results._tokenResponse.localId : null
    }

    async function getItemFromFirestor(id) {
        const itemRef = doc(collection(db, "items"), id);
        const querrySnapshot = await getDoc(itemRef);
        var item = null
        if (querrySnapshot.exists()) {
            // item = querrySnapshot.data();
            item = {
                id: querrySnapshot.id,
                ...querrySnapshot.data(),
            }
        }
        return item
    }

    const deleteFunc = async (id) => {
        const userId = await getUserAsync();
        const itemRef = doc(collection(db, "carts"), userId);
        const itemSnapshot = await getDoc(itemRef);

        if (itemSnapshot.exists()) {
            const updatedItems = itemSnapshot.data().item.filter((item) => item.itemId !== id);
            await updateDoc(itemRef, { item: updatedItems });
            Alert.alert('Item successfully deleted!');
            setListCart(updatedItems)
        } else {
            console.log('Cart not found');
        }
    }


    const increaseQuantity = (data, index) => {
        const items = [...listCart]
        items[index].itemQuantity += 1
        setListCart(items)

        let finalPrice = totalPrice
        finalPrice += parseInt(data.price)
        setTotalPrice(finalPrice)
    }


    const decreaseQuantity = (data, index) => {
        const items = [...listCart]
        let finalPrice = totalPrice

        if (items[index].itemQuantity <= 1) {
            items[index].itemQuantity = 1
        } else {
            items[index].itemQuantity -= 1
            finalPrice -= parseInt(data.price)
        }
        setListCart(items)
        setTotalPrice(finalPrice)

    }




    if (listCart.length === 0) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <Text style={styles.navHead}>Cart</Text>
                <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")} />
            </View>
            <ScrollView>
                {listCart.map((data, index) => (
                    <View style={styles.ScrollView} key={index}>
                        <View style={styles.box}>
                            <View style={styles.contentTop}>
                                <Text style={styles.description}>{data.description}</Text>
                                <Image source={{ uri: data.imgUrl }} style={styles.img} />
                            </View>
                            <View>
                                <Text style={styles.price}>R{data.price}</Text>
                            </View>
                            <View style={styles.contentBottom}>
                                <MaterialCommunityIcons name='delete' size={25} color={"#2F2F2F"} style={styles.remove} onPress={() => deleteFunc(data.id)} />
                                <View style={styles.quantity}>
                                    <MaterialCommunityIcons name='minus-circle' size={30} color={"#fea70d"} onPress={() => decreaseQuantity(data, index)} />
                                    <Text style={{ fontSize: 20 }}>{data.itemQuantity}</Text>
                                    <MaterialCommunityIcons name='plus-circle' size={30} color={"#fea70d"} onPress={() => increaseQuantity(data, index)} />
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
                <View style={styles.checkoutContainer}>
                    <Text style={styles.heading}>Bill Details</Text>
                    <View style={styles.checkOutContent}>
                        <Text>Total</Text>
                        <Text>R{totalPrice}</Text>
                    </View>
                    <View style={styles.checkOutContent}>
                        <Text>Delivery Charge</Text>
                        <Text>R0</Text>
                    </View>
                    <View style={styles.hr}></View>
                    <TouchableOpacity style={styles.displayButton}>
                        <Text>{listCart.length} |</Text>
                        <View style={styles.checkOut}>
                            <Text style={styles.text}>CheckOut</Text>
                            <MaterialCommunityIcons name='greater-than' size={30} color={"#fff"} />
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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