import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { Alert } from 'react-native';


export default function AddToCartBtn({ idItem }) {
    

    async function addToCart() {

        const userId = await getUserAsync();


        if (userId !== null) {
            try {
                var pendingOrders = null
                const snapshot = await getDocs(collection(db, "carts"));
                if (snapshot.docs.length > 0) {
                    var pOrders = [];
                    snapshot.forEach((doc) => {
                        pOrders.push(doc.data())
                    })

                    const myItem = {
                        itemId: idItem,
                    }
                    pOrders[0].item.push(myItem)
                    const docRef = await setDoc(doc(db, "carts", userId), pOrders[0])
                } else {
                    const myItem = {
                        item: [{
                            itemId: idItem,

                        }]
                    }
                    pendingOrders = myItem;
                    await setDoc(doc(db, "carts", userId), pendingOrders);
                }
                Alert.alert("Successfully added to cart");
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No user");
        }

    }

    async function getUserAsync() {
        const signedInUser = await AsyncStorage.getItem("user");
        const results = signedInUser !== null ? JSON.parse(signedInUser) : null;

        return signedInUser !== null ? results._tokenResponse.localId : null
    }


    return (
        <TouchableOpacity style={styles.addBtn} onPress={addToCart}>
            <Text style={styles.addBtnText}>ADD</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        borderWidth: 1,
        width: "50%",
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
})