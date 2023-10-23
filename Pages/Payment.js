import { useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { db } from '../Config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Payment() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const route = useRoute()
   const navigation = useNavigation()

    async function makePayment() {
        const listCart = route.params?.listCart
        const totalPrice = listCart?.totalPrice
        const amount = Math.floor(parseInt(totalPrice) * 100)
        const paymentIntet = await fetchpaymentIntent(amount);
        console.log("paymentIntet:", paymentIntet);
        await onCheckout(paymentIntet)
        const userId = await getUserAsync();
        if (userId !== null) {
            try {
                var pendingOrders = null
                const snapshot = await getDocs(collection(db, "orders"));
                if (snapshot.docs.length > 0) {
                    var pOrders = [];
                    snapshot.forEach((doc) => {
                        pOrders.push(doc.data())
                    })

                    const myItem = {
                        itemId: listCart,
                    }
                    pOrders[0].item.push(myItem)
                    const docRef = await setDoc(doc(db, "orders", userId), pOrders[0])
                } else {
                    const myItem = {
                        item: [{
                            itemId: listCart,

                        }]
                    }
                    pendingOrders = myItem;
                    await setDoc(doc(db, "orders", userId), pendingOrders);
                }
                Alert.alert("Successfully ordered");
                pOrders = []
                navigation.navigate("/home")
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No user");
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
        console.log("paymentIntent:",paymentIntent);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={makePayment}>
                <Text>Make payment</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
})