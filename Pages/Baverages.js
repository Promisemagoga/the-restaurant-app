import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Bevarages() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productNav}>
                <Text style={styles.navHead}>Beverage list</Text>
                <MaterialCommunityIcons name='arrow-left' size={30} color={"#000000"} onPress={() => navigation.navigate("home")}/>
            </View>
            <ScrollView>
                <View style={styles.ScrollView}>
                    <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>Chocolate Milkshake</Text>
                            <Image source={require("../assets/milkshake1.jpg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R20</Text>
                                <Text style={styles.name}>Best Deal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>Hulk burger + Fries + 2 in-house sauces</Text>
                            <Image source={require("../assets/liqui2.jpeg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R18</Text>
                                <Text style={styles.name}>Best Deal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.contentTop}>
                            <Text style={styles.description}>Bacon - King burger + Salad</Text>
                            <Image source={require("../assets/cans.jpeg")} style={styles.img} />
                        </View>
                        <View style={styles.contentBottom}>
                            <View>
                                <Text style={styles.price}>R16</Text>
                                <Text style={styles.name}>Best Deal</Text>
                            </View>
                            <TouchableOpacity style={styles.addBtn}>
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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