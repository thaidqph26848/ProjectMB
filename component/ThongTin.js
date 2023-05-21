import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

const ThongTin = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <Image source={require('./image/profile.png')}
                    style={{ width: 350, height: 190, padding: 10, margin: 10 }} />
                <Text>Đỗ Quóc Thái</Text>
                <Text>
                    Cp17309
                </Text>
                <Text>
                    thaidqph26848@fpt.edu.vn
                </Text>
                <StatusBar style="auto" />


            </View>

        </SafeAreaView>

    )
}
export default ThongTin;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        margin: 10,
        padding: 10,
        fontSize: 35,
        color: '#fff'
    },
    textInput: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        color: '#fff',
        fontSize: 50
    },
    header: {
        padding: 5,



        width: "100%",
        height: 45,
        marginBottom: 20,
        fontSize: 100,
        color: '#fff',
        paddingRight: 45
    },
    password: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        fontSize: 100,
        color: '#fff',
        paddingRight: 45
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: '#FFF'
    },
    loginBtn:
    {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#1d8bf1",
    },
    singup: {
        color: '#1d8bf1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
        margin: 10
    }
})