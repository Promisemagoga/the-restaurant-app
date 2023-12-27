import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';

export default function Cart() {
    const [listCart, setListCart] = useState([])
    const navigation = useNavigation()
    const [itemsPrice, setItemsPrice] = useState(0)
    const deliveryCharge = 5
    const totalPrice = itemsPrice + deliveryCharge
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const route = useRoute()
    async function makePayment() {
        const amount = Math.floor(parseInt(totalPrice) * 100);
        const paymentIntent = await fetchpaymentIntent(amount);
        console.log("paymentIntent:", paymentIntent);
        try {
            await onCheckout(paymentIntent);
            const userId = await getUserAsync();
            if (userId !== null) {
                const snapshot = await getDocs(collection(db, "orders"));
                if (snapshot.docs.length > 0) {
                    const pOrders = snapshot.docs[0].data().item || [];
                    const myItem = {
                        itemId: listCart,
                        totalPrice: totalPrice
                    };
                    pOrders.push(myItem);
                    await setDoc(doc(db, "orders", userId), { item: pOrders });
                } else {
                    const myItem = {
                        item: [{
                            itemId: listCart,
                        }]
                    };
                    await setDoc(doc(db, "orders", userId), myItem);
                }
                navigation.navigate('confirmation')
                Alert.alert("Successfully ordered");
                // clearCart();
            } else {
                Alert.alert("Failed to place the order");

            }
        } catch (error) {
            if (error.message !== "Payment was canceled") {
                console.log(error);
                await rollbackPayment(paymentIntent);
                Alert.alert("Failed to place the order");
            }
        }
    }
    
    



    const fetchpaymentIntent = async (amount) => {
        const url = 'https://the-resturant-backend.onrender.com/payment'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: amount
                })

            })
            const data = await response.json();
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const onCheckout = async (paymentIntent) => {
        console.log("paymentIntent:", paymentIntent);
        const { error: paymentSheetError } = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            paymentIntentClientSecret: paymentIntent.paymentIntent,
            defaultBillingDetails: {
                name: 'Jane Doe',
            },
        });
        if (paymentSheetError) {
            Alert.alert('Something went wrong', paymentSheetError.message);
            return;
        }

        const { error: paymentError } = await presentPaymentSheet();
        if (paymentError) {
            Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
            return;
        }
        //make order

    };

    async function getUserAsync() {
        const signedInUser = await AsyncStorage.getItem("user");
        const results = signedInUser !== null ? JSON.parse(signedInUser) : null;

        console.log("see user object", results._tokenResponse.localId);
        return signedInUser !== null ? results._tokenResponse.localId : null
    }

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
                setItemsPrice(finalPrice)
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
            // setListCart(updatedItems)
            Alert.alert('Item successfully deleted!');
        } else {
            console.log('Cart not found');
        }
    }


    const increaseQuantity = (data, index) => {
        const items = [...listCart]
        items[index].itemQuantity += 1
        setListCart(items)

        let finalPrice = itemsPrice
        finalPrice += parseInt(data.price)
        setItemsPrice(finalPrice)
    }


    const decreaseQuantity = (data, index) => {
        const items = [...listCart]
        let finalPrice = itemsPrice

        if (items[index].itemQuantity <= 1) {
            items[index].itemQuantity = 1
        } else {
            items[index].itemQuantity -= 1
            finalPrice -= parseInt(data.price)
        }
        setListCart(items)
        setItemsPrice(finalPrice)

    }

    const clearCart = async () => {
        try {
            const userId = await getUserAsync();
            const itemRef = doc(collection(db, "carts"), userId);
            await deleteDoc(itemRef);
            console.log('Cart cleared successfully');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };






    if (listCart.length === 0) {
        <SafeAreaView >

        </SafeAreaView>
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <View style={styles.navContent}>
                    <MaterialCommunityIcons name='account' size={30} color={"#2F2F2F"} style={styles.icon} onPress={() => navigation.navigate("user")} />
                    <Text style={styles.navHead}>Cart</Text>
                    <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")} />
                </View>
            </View>

            <ScrollView>
                {listCart.length === 0 ?
                    <View style={{ marginTop: 200 }}>
                        <Text style={{ color: "#000" }}>Cart is empty!!!</Text>
                    </View>
                    :
                    <>
                        {listCart.map((data, index) => (
                            <View style={styles.ScrollView} key={index}>
                                <View style={styles.box}>
                                    <View style={styles.contentTop}>
                                        <View>
                                            <Text style={styles.name}>{data.name}</Text>
                                            <Text style={styles.description}>{data.description}</Text>
                                        </View>
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
                    </>
                }
            </ScrollView>
            <View style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
                <View style={styles.checkoutContainer}>
                    <Text style={styles.heading}>Bill Details</Text>
                    <View style={styles.checkOutContent}>
                        <Text style={styles.description}>Items Price</Text>
                        <Text style={styles.totalPrice}>R{itemsPrice}</Text>
                    </View>
                    <View style={styles.checkOutContent}>
                        <Text style={styles.description}>Delivery Charge</Text>
                        <Text style={styles.totalPrice}>R{deliveryCharge}</Text>
                    </View>
                    <View style={styles.checkOutContent}>
                        <Text style={styles.description}>Total Price</Text>
                        <Text style={styles.totalPrice}>R{totalPrice}</Text>
                    </View>
                    <View style={styles.hr}></View>
                </View>
                <TouchableOpacity style={styles.displayButton}>
                    <Text style={styles.CheckOuttext}>{listCart.length} items <Text style={styles.divider}>|</Text></Text>
                    <TouchableOpacity style={styles.checkOut} onPress={makePayment}>
                        <Text style={styles.text} >Checkout</Text>
                        <MaterialCommunityIcons name='greater-than' size={40} color={"#fff"} />
                    </TouchableOpacity>
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
        backgroundColor: "whitesmoke"

    },
    box: {
        width: 350,
        height: 260,
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
        padding: 20
    },

    ScrollView: {
        width: "100%",
        padding: 20,
    },

    productNav: {
        width: "100%",
        height: 100,
        backgroundColor: "#ffffff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },

    navContent: {
        display: "flex",
        flexDirection: "row-reverse",
        marginTop: 20,
        padding: 10,
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "space-between",
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
        width: 100,
        height: 100,
        borderRadius: 100,
        objectFit: "contain"
    },

    contentBottom: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    description: {
        width: 200,
        fontSize: 16,
        fontWeight: "300"
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
        fontSize: 20
    },

    name: {
        color: "#009687",
        fontWeight: "400",
        fontSize: 18,
        marginBottom: 10
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




    checkOut: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
        width: 350,

        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: '#fea70d',
        // padding: 10,
        margin: 20,
        borderRadius: 5,
    },

    displayButton: {
        width: 350,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: "#fea70d",
        height: 70,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        borderRadius: 5
    },

    text: {
        color: "#fff",
        fontSize: 20
    },

    CheckOuttext: {
        color: "#fff",
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: "bold"
    },

    heading: {
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    divider: {
        fontSize: 30
    },

    totalPrice: {
        color: "#009687",
        fontSize: 16,
        fontWeight: "500"
    }


});