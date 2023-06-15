import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Alert,FlatList } from 'react-native';
import React, { useState } from 'react';
import COLORS from './colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PrimaryButton } from './Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
let URL_ADD = "http://192.168.1.22:3000/sanpham?_expand=cat";
var dem = 0;
const GioHang = ({ navigation,route }) => {
    const item = route.params;
    const [isLoading, setLoading] = useState(true);
    const [sanpham, setsanpham] = useState([]);
    const [ten_sp, setten_sp] = useState('');
    const [hang, sethang] = useState('');
    const [gia, setgia] = useState('');
    const [image, setimage] = useState()

    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);

    

    const CartCard = ({item}) => {
        return (
            <View style={styles.cartCard}>
                <Image source={{ uri: `${item.image}` }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.ten_sp}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.cat.name}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.gia}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>3</Text>
                    <View style={styles.actionBtn}>
                        <Icon name="remove" size={25} color={COLORS.white} />
                        <Icon name="add" size={25} color={COLORS.white} />
                    </View>
                </View>
            </View>
        );
    };
    return (

        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={sanpham}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$50</Text>
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                            <PrimaryButton title="CHECKOUT" />
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>

    )
}
export default GioHang;
const styles = StyleSheet.create({

    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },



})