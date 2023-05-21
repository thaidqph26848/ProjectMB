import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Button, ScrollView, FlatList, TouchableHighlight,Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from './colors/colors';
import categories from './Category/categories';
import foods from './Category/datatmp';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const TrangChu = ({ navigation }) => {
    const Card = ({ food }) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ChiTietSP', food)}>
                <View style={styles.card}>
                    <View style={{ alignItems: 'center',marginBottom:10, marginTop:5 }}>
                        <Image source={food.image} style={{ height: 90, width: 100 }} />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.name}</Text>
                        <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                            {food.brand}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            ${food.price}
                        </Text>
                        <View style={styles.addToCartBtn}>
                            <Icon name="add" size={20} color={COLORS.white} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 28 }}>Hello,</Text>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>Thai</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>What do you want to buy? </Text>
                </View>
                <TouchableOpacity
                 onPress={() => navigation.navigate('ThongTin')}
                >
                     <Image source={require('./image/profile.png')}
                    style={{ height: 50, width: 50, borderRadius: 25 }} 
                    
                    />
                   
                </TouchableOpacity>
               
            </View>
            <View style={{
                marginTop: 40,
                flexDirection: 'row',
                paddingHorizontal: 20
            }}>
                <View style={styles.inputContainer}>
                    <Icon name='search' size={28} />
                    <TextInput style={{ flex: 1, fontSize: 18 }} placeholder='Search... ' />
                </View>
                <View style={styles.sortBtn}>
                    <Icon name='tune' size={28} color={COLORS.white} />
                </View>

            </View>
            {/* <View>
                <ListCategories />
            </View> */}
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={foods}
                renderItem={({ item }) => <Card food={item} />}
            />
        </SafeAreaView>
    )
}
export default TrangChu;
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})