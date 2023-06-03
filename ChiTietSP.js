import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from './colors/colors';
import { SecondaryButton } from './Button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChiTietSP = ({ navigation, route }) => {
    const item = route.params;
    return (

        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chi Tiet SP</Text>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 280,
                    }}>
                    <Image source={item.image} style={{ height: 220, width: 220 }} />
                </View>
                <View style={styles.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
                            {item.name}
                        </Text>
                        <View style={styles.iconContainer}>
                            <Icon name="favorite-border" color={COLORS.primary} size={25} />
                        </View>
                    </View>
                    <Text style={styles.detailsText}>
                        Hiệu năng vượt trội - Chip Apple A15 Bionic mạnh mẽ, hỗ trợ mạng 5G tốc độ cao
                        Không gian hiển thị sống động - Màn hình 6.1" Super Retina XDR độ sáng cao, sắc nét
                        Trải nghiệm điện ảnh đỉnh cao - Camera kép 12MP, hỗ trợ ổn định hình ảnh quang học
                        Tối ưu điện năng - Sạc nhanh 20 W, đầy 50% pin trong khoảng 30 phút
                    </Text>
                    <View style={{ marginTop: 40, marginBottom: 40 }}>
                        <SecondaryButton title="Add To Cart" 
                         onPress={() => navigation.navigate('GioHang', item)}
                        />
                       
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
export default ChiTietSP;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: COLORS.white,
    },
})