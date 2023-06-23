import { View, Text, Image, Button,StyleSheet } from "react-native"

import React from "react";


const SplassScreen = (props) => {
    React.useEffect(()=>{
        setTimeout(() => {
            props.navigation.navigate('Login')
        }, 1000);
    });
    return (
        <View style={st.gt}>
            <View style={st.backgroundColor}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={require('./image/background.jpg')} 
            />
            </View>
           
          
        </View>
    )
}
export default SplassScreen
const st = StyleSheet.create({
    backgroundColor:'#FFFFCC',
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
})