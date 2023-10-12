import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import { Alert } from 'react-native';
import AddToCartBtn from '../Components/AddToCartBtn';



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
                                        <Text style={styles.price}>R{items.price}</Text>
                                        <Text style={styles.name}>{items.name}</Text>
                                    </View>
                                 <AddToCartBtn idItem={items.id}/>
                                </View>
                            </View>
                        ))
                    }
             
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

   

    price: {
        color: "#009687",
        fontWeight: "bold",
        fontSize: 22
    },

    name: {
        color: "#009687",
    }
});