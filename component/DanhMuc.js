import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';

const DanhMuc = ({ navigation }) => {
    return (
        <ImageBackground style={{ height: '100%', width: '100%' }} source={require('./image/backgroung.png')} resizeMode='stretch' >
            <View style={styles.header}>
                <TouchableOpacity style={{ height: '100%', aspectRatio: 1, position: 'absolute', right: 0, width: 40, padding: 4, margin: 7 }}
                >
                    <Image style={{ width: '100%', height: '100%' }} source={require('./image/menu.png')} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: '100%', aspectRatio: 1, position: 'relative', left: 0, width: 40, padding: 4, margin: 2 }}
                    onPress={() => {
                        navigation.navigate('TrangChu')
                    }}
                >
                    <Image style={{ width: '100%', height: '100%' }} source={require('./image/arrow.png')} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <StatusBar barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 1, }}>


                <StatusBar style="auto" />
            </SafeAreaView>
        </ImageBackground >
    )
}
export default DanhMuc;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
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

})