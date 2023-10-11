import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SharingMeals() {
    const navigation = useNavigation()
    const [menu, setMenu] = useState([])


    useEffect(() => {
        const viewBurgers = async () => {

            const viewRef = collection(db, "items");
            const q = query(viewRef, where("category", "==", "Sharing Meals"))
            const querrySnapshot = await getDocs(q)
            console.log("querrySnapshot", querrySnapshot);

            if (!querrySnapshot.empty) {
                const data = querrySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setMenu(data)
                console.log("data", data);
            } else {
                console.log("No such document!");

            }
        }
        viewBurgers()
    }, [])


    async function addToCart(id) {
        console.log("check itemID:", id);
        //get item id and user id
        // const userId = auth.currentUser.uid
        const userId = await getUserAsync();

        // console.log("userDetails",userId);

        if (userId !== null) {
            try {
                var pendingOrders = null
                const snapshot = await getDocs(collection(db, "carts"));
                if (snapshot.docs.length > 0) {
                    console.log("Something");
                    var pOrders = [];
                    snapshot.forEach((doc) => {
                        pOrders.push(doc.data())
                    })

                    const myItem = {
                        itemId: id,
                    }
                    pOrders[0].item.push(myItem)
                    console.log("line64", pOrders);
                    const docRef = await setDoc(doc(db, "carts", userId), pOrders[0])
                } else {
                    console.log("Nothing");
                    const myItem = {
                        item: [{
                            itemId: id,

                        }]
                    }
                    pendingOrders = myItem;
                    await setDoc(doc(db, "carts", userId), pendingOrders);
                }
                // console.log(pendingOrders[0].item);

                // const myItem = {
                //     itemId: id,

                // }

                // pendingOrders[0].item.push(myItem)
                // console.log("line64", pendingOrders);


                // const docRef = await setDoc(doc(db, "carts", userId), pendingOrders[0])


                // const pendingOrders = []
                // const snapshot = await getDocs(collection(db, "carts"));
                // snapshot.forEach((doc) => {
                //     pendingOrders.push(doc.data())
                // })
                // console.log(pendingOrders);
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

        console.log("see user object", results._tokenResponse.localId);
        // console.log("see user object",results);

        return signedInUser !== null ? results._tokenResponse.localId : null
    }



    if (!menu) return <Text>Loading...</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <Text style={styles.navHead}>Sharing meal list</Text>
                <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")} />
            </View>
            <ScrollView>
                <View style={styles.ScrollView}>
                    {
                        menu.map((items, index) => (
                            <View style={styles.box} key={index}>
                                <View style={styles.contentTop}>
                                    <Text style={styles.description}>{items.description}</Text>
                                    <Image source={{ uri: items.imgUrl }} style={styles.img} />
                                </View>
                                <View style={styles.contentBottom}>
                                    <View>
                                        <Text style={styles.price}>{items.price}</Text>
                                        <Text style={styles.name}>{items.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(items.id)}>
                                        <Text style={styles.addBtnText}>ADD</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                    {/* <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>Hulk burger + Fries + 2 in-house sauces</Text>
                            <Image source={require("../assets/family1.jpeg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R210</Text>
                                <Text style={styles.name}>Family Meal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>6 piece chicken + 2 Fries + 2 salads + 2 mini loafs</Text>
                            <Image source={require("../assets/family3.jpeg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R137</Text>
                                <Text style={styles.name}>Family  Meal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>12 Hotwings + 4 Sliders + 2 fries</Text>
                            <Image source={require("../assets/family4.jpg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R138</Text>
                                <Text style={styles.name}>Family Meal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
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
        height: 200,
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
        width: "100%"
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
    }
});