import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar,RefreshControl, SafeAreaView, Button, ScrollView, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from './colors/colors';
import categories from './Category/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
let strKey = 'loginInfo'
var dem = 0;
let URL = "http://192.168.1.22:3000/sanpham";

const TrangChu = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [sanpham, setsanpham] = useState([]);
    const [ten_sp, setten_sp] = useState('');
    const [hang, sethang] = useState('');
    const [gia, setgia] = useState('');
    const [image, setimage] = useState()

    const [fullname, setfullname] = useState("");
    const [avatar, setAvatar] = useState(null)
    const [id, setid] = useState('')
    const [username, setusername] = useState(null);
    const [password, setPassword] = useState(null)

    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const reloadData = React.useCallback(
        () => {
            setreloading(true);
            //load lai du lieu
            dem++;
            setcounter(dem);
            setTimeout(() => {
                setreloading(false);
            }, 2000);
        }
    );

    const getData = async () => {

        try {
            const value = await AsyncStorage.getItem(strKey)
            if (value !== null) {
                // lấy được dữ liệu:
                let obj = JSON.parse(value)
                setAvatar(obj.avatar)
                setfullname(obj.fullname)
                setid(obj.id)
                setusername(obj.username)
                setPassword(obj.password)


            }
        } catch (e) {
            // error reading value
            console.log(e);
        }

    }

    const getSP = async () => {
        fetch(URL)
            .then((res) => {
                return res.json();
            })
            .then(async (res_json) => {
                try {
                    const response = await fetch(URL);
                    const jsonPost = await response.json();

                    setsanpham(jsonPost);
                } catch (e) {
                    console.log(e);
                }
            })
    }

    const Card = ({ item }) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ChiTietSP', item)}>
                <View style={styles.card}>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
                        <Image style={{ height: 100, width: 100 }}
                            source={{ uri: `${item.image}` }} />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.ten_sp}</Text>
                        <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                            {item.hang}
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
                            ${item.gia}
                        </Text>
                        <View style={styles.addToCartBtn}>
                            <Icon name="add" size={20} color={COLORS.white} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    useEffect(() => {
        getData();
        getSP();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 28 }}>Hello, </Text>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>{fullname}</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>What do you want to buy? </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ThongTin')}
                >
                   <Image source={{ uri: avatar }} 
                    style={{ height: 50, width: 50, borderRadius: 25 }}/>
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
            <ScrollView refreshControl={
                <RefreshControl refreshing={reloading}
                    onRefresh={reloadData} />
            }>
                <SafeAreaView style={{ flex: 1, }}>
                    <View >
                        <FlatList data={sanpham}
                            keyExtractor={(item) => { return item.id }}
                            numColumns={2}
                            renderItem={Card} style={{ marginBottom: 10 }} />
                    </View>
                </SafeAreaView>
            </ScrollView>

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
        height: 230,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 20,
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