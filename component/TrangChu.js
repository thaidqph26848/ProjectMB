import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

const TrangChu = ({ navigation }) => {
    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('./image/backgroung.png')} resizeMode='stretch' >

            <StatusBar barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>

                    <Text style={styles.title}>TrangChu</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default TrangChu;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        margin: 2,
        padding: 4,
        fontSize: 35,
        color: '#fff',
        height: 50,
    },
    header: {
        padding: 5,
        width: "100%",
        height: 45,
        marginBottom: 720,
        fontSize: 100,
        color: '#fff',
        justifyContent: 'space-between'
    },

})