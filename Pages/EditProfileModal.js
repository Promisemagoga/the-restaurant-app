import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';


export default function EditProfileModal({ setOpenModal, updateUserInfo }) {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [address, setAdress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            const docId = updateUserInfo.id
            const docRef = doc(db, "userData", docId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const document = {
                    id: docSnap.id,
                    ...docSnap.data()
                }
                setName(document.name)
                setSurname(document.surname)
                setPhoneNumber(document.phoneNumber)
                setAdress(document.address)
            } else {
                console.log("No such document");
            }
        }
        fetchData()
    }, [])

    const updateData = async () => {
        
        const dataToSave = {
            name: name,
            surname: surname,
            address: address,
            phoneNumber: phoneNumber,
        }
       

        const docId = updateUserInfo.id
        const docRef = doc(db, "userData", docId)
        await updateDoc(docRef, dataToSave)
            .then(() => {
                console.log('Data successfully updated!!');
                Alert.alert('Data successfully updated!!');
                fetchData()
            })
            .catch((error) => {
                console.error('Error updating data:', error)
                Alert.alert("Error updating data")
            })
    }




    return (
        <SafeAreaView style={styles.container}>
            <MaterialCommunityIcons name='close-circle-outline' size={25} style={styles.heading} onPress={() => setOpenModal(false)} />
            <View style={styles.profileContainer}>
                <View style={styles.form}>
                    <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>Edit your information</Text>
                    <TextInput
                        placeholder='Enter name...'
                        style={styles.textInput}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <TextInput
                        placeholder='Enter surname...'
                        style={styles.textInput}
                        onChangeText={(text) => setSurname(text)}
                        value={surname}
                    />
                    <TextInput
                        placeholder='Enter home address...'
                        style={styles.textInput}
                        onChangeText={(text) => setAdress(text)}
                        value={address}

                    />
                    <TextInput
                        keyboardType='numeric'
                        placeholder='Enter contact number...'
                        style={styles.textInput}
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}

                    />
                    {/* <View>
                        <Text style={styles.cardTitle}>Card Details</Text>
                        <View style={styles.cardForm}>
                            <TextInput
                                placeholder='Enter card name...'
                                style={styles.textInput}

                            />
                            <TextInput
                                keyboardType='numeric'
                                placeholder='Enter card number...'
                                style={styles.textInput}


                            />
                            <View style={styles.dateCont}>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder='MM/YYY'
                                    style={styles.dateInput}


                                />
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder='000'
                                    style={styles.dateInput}
                                />
                            </View>
                        </View>
                    </View> */}
                </View>
                <TouchableOpacity style={styles.signInBtn} onPress={updateData}>
                    <Text style={styles.signInBtnText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "84%",
        height: "auto",
        marginHorizontal: "8%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 20,
        borderRadius: 30
    },

    textInput: {
        borderBottomWidth: 1,
        width: 300
    },

    dateInput: {
        borderBottomWidth: 1,
        width: 145
    },

    form: {
        display: "flex",
        flexDirection: "column",
        rowGap: 30
    },

    profileContainer: {
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        rowGap: 50,
        alignItems: "center"
    },

    signInBtn: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#fea70d',
        width: 230,
        height: 40,
        borderRadius: 30

    },

    signInBtnText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 19
    },

    signIn: {
        textAlign: "center",
        fontSize: 48,
        fontWeight: "700",

    },


    cardTitle: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "700"
    },

    dateCont: {
        display: "flex",
        flexDirection: "row",
        columnGap: 10

    },

    cardForm: {
        display: "flex",
        flexDirection: "column",
        rowGap: 20
    },

    heading: {
        marginLeft: "auto",
        paddingRight: 10
    }



});