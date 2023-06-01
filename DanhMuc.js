import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Alert, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import COLORS from './colors/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import foods from './Category/datatmp';
import categories from './Category/categories';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RefreshControl } from 'react-native-gesture-handler';
// import Dialog from "react-native-dialog";
var dem = 0;
var url_sanpham = 'http://172.16.201.4:3000/sanpham';

const DanhMuc = (props) => {
    // const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const [sanpham, setsanpham] = useState([]);
    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);
    // const [img_source, setimg_source] = useState(null);
    // const [img_base64, setiimg_base64] = useState(null);

    const reloadData = React.useCallback(
        () => {
            setreloading(true);
            dem++;
            setcounter(dem);
            setTimeout(() => {
                setreloading(false);
            }, 2000);
        }
    );
    const getSP = async () => {
        try {
            const response = await fetch(url_sanpham);

            const json = await response.json();

            setsanpham(json);
        } catch (error) {
            console.error(error);
        } finally {
            setreloading(false)
        }
    };

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getSP();
        });

        return unsubscribe;
    }, [props.navigation]);

    const renderSP = ({ item }) => {
        const xoaSP = () => {
            Alert.alert("Xóa", "Bạn có chắc xóa sản phẩm này không?", [
                {
                    text: 'Không',
                    style: 'cancel'
                },
                {
                    text: "Đồng ý", onPress: () => {
                        fetch(url_sanpham + "/" + item.id, {
                            method: 'DELETE'
                        })
                            .then((response => response.json()
                            ))
                            .then(data => {
                                const newPosts = sanpham.filter(sanpham => sanpham.id !== item.id);
                                setsanpham(newPosts);
                            })
                            .catch(error => console.error(error));
                    }
                }
            ])
        }
        return (
            <View style={styles.cartCard}>
                <Image source={item.image} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.ten_sp}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.hang}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.gia}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <View style={styles.actionBtn}>
                        <Icon name="create" size={25} color={COLORS.black} style={{ marginRight: 10 }} />
                        <Icon name="delete" size={25} color={COLORS.black} onPress={xoaSP} />
                    </View>
                </View>
            </View>
        );
    }
    // const ListCategories = () => {
    //     return (
    //         <ScrollView
    //             horizontal
    //             showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={styles.categoriesListContainer}>
    //             {categories.map((category, index) => (
    //                 <TouchableOpacity
    //                     key={index}
    //                     activeOpacity={0.8}
    //                     onPress={() => setSelectedCategoryIndex(index)}>
    //                     <View
    //                         style={{
    //                             backgroundColor:
    //                                 selectedCategoryIndex == index
    //                                     ? COLORS.primary
    //                                     : COLORS.secondary,
    //                             ...styles.categoryBtn,
    //                         }}>
    //                         <View style={styles.categoryBtnImgCon}>
    //                             <Image
    //                                 source={category.image}
    //                                 style={{ height: 35, width: 35, borderRadius: 30, resizeMode: 'contain' }}
    //                             />
    //                         </View>
    //                         <Text
    //                             style={{
    //                                 fontSize: 15,
    //                                 fontWeight: 'bold',
    //                                 marginLeft: 10,
    //                                 color:
    //                                     selectedCategoryIndex == index
    //                                         ? COLORS.white
    //                                         : COLORS.primary,
    //                             }}>
    //                             {category.name}
    //                         </Text>
    //                     </View>
    //                 </TouchableOpacity>
    //             ))}
    //         </ScrollView>
    //     );
    // };


    return (
        <View>
            <Text style={{ fontSize: 25, margin: 10, textAlign: "center", borderRadius: 30, backgroundColor: COLORS.primary }}>Danh sách sản phẩm</Text>
            <ScrollView refreshControl={
                <RefreshControl refreshing={reloading}
                    onRefresh={reloadData} />
            }>
                <FlatList data={sanpham}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={renderSP} style={{ marginBottom: 100 }} />
            </ScrollView>
        </View>
    )
    // return (
    //     <SafeAreaView style={{ flex: 1, }}>
    //         <View style={styles.container}>
    //             <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
    //             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>List</Text>
    //         </View>
    //         <View>
    //             <ListCategories />
    //         </View>
    //         <FlatList

    //             showsVerticalScrollIndicator={false}
    //             contentContainerStyle={{ paddingBottom: 80 }}
    //             data={foods}
    //             renderItem={({ item }) => <CartCard item={item} />}
    //             ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
    //         />

    //     </SafeAreaView>

    // )
}
export default DanhMuc;
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
})