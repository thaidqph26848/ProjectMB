import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from './colors/colors';
import { SecondaryButton } from './Button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
let url_GH = "http://192.168.1.22:3000/giohangs"
const ChiTietSP = ({ navigation, route }) => {
    const item = route.params;

    const [isLoading, setLoading] = useState(true);
    const [sanpham, setsanpham] = useState([]);
    const [ten_sp, setten_sp] = useState('');
    const [hang, sethang] = useState('');
    const [gia, setgia] = useState('');
    const [image, setimage] = useState()
    const [mota, setmota] = useState('')
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    
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
                        marginBottom:63
                    }}>
                    <Image style={{ height: 265, width: 200 }}
                        source={{ uri: `${item.image}` }} />
                </View>
                <View style={styles.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text
                                style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
                                Ten: {item.ten_sp}
                            </Text>
                            <Text
                                style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
                                Gia: {item.gia}$
                            </Text>
                            <Text
                                style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
                                Hang: {item.cat.name}
                            </Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <Icon name="favorite-border" color={COLORS.primary} size={25} />
                        </View>
                    </View>
                    <Text style={styles.detailsText}>
                        {item.mota}
                    </Text>
                   
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