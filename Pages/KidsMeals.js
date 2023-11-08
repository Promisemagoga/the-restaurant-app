import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Config/firebase';
import AddToCartBtn from '../Components/AddToCartBtn';


export default function KidsMeals() {
    const navigation = useNavigation()
    const [menu, setMenu] = useState([])


    useEffect(() => {
        const viewBurgers = async () => {

            const viewRef = collection(db, "items");
            const q = query(viewRef, where("category", "==", "Kids Meals"))
            const querrySnapshot = await getDocs(q)
    
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


    if (!menu) return <div>Loading...</div>;

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.productNav}>
                <View style={styles.navContent}>
                    <MaterialCommunityIcons name='account' size={30} color={"#2F2F2F"} style={styles.icon} onPress={() => navigation.navigate("user")} />
                    <Text style={styles.navHead}>Kids Meals</Text>
                    <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")} />
                </View>
            </View>
            <ScrollView>
                <View style={styles.ScrollView}>
                    {
                        menu.map((items, index) => (
                            <View style={styles.box}>
                            <View style={styles.contentTop}>
                                <View style={{display:"flex", flexDirection:"column",rowGap: 10}}>
                                <Text style={styles.name}>{items.name}</Text>
                                <Text style={styles.description}>{items.description}</Text>
                                </View>
                                <Image source={{uri: items.imgUrl}} style={styles.img} />
                            </View>
                            <View style={styles.contentBottom}>
                
                                    <Text style={styles.price}>R{items.price}</Text>
                          
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
        width: "100%",
        height: 100,
        backgroundColor: "#ffffff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10

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
        width: "50%",
        height: 100,
        objectFit: "contain",
        borderRadius: 10
    },


    contentBottom: {
        marginTop: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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

    description: {
        width: 150,
        fontSize: 14,
        fontWeight: "200"
    },

    name: {
        color: "#009687",
        fontSize: 18
    },


});