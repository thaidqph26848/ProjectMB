import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';

const DanhMuc = ({ navigation }) => {
    return (

        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>

                <Text>Danh Muc San Pham</Text>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>

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