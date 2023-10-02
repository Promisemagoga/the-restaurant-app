import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function UserProfile() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require("../assets/ppic.png")}
                    />
                    <View style={styles.form}>
                        <TextInput
                            placeholder='Enter name...'
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder='Enter surname...'
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder='Enter email...'
                            style={styles.textInput}

                        />
                        <TextInput
                            placeholder='Enter home address...'
                            style={styles.textInput}

                        />
                        <TextInput
                            placeholder='Enter contact number...'
                            style={styles.textInput}

                        />
                        <View>
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
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signInBtn}>
                        <Text style={styles.signInBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll: {
        width:" 100%"
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
        marginTop: 100,
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
    }



});