import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar,
    SafeAreaView, Modal, showModalDialog, Button, ScrollView, FlatList, TouchableHighlight, Dimensions, Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from './colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from './Category/categories';
import foods from './Category/datatmp';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
var dem = 0;
const url_pro = "http://172.19.200.210:3000/sanpham";
const Add = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [name, setname] = useState('');
    const [brand, setbrand] = useState()
    const [price, setprice] = useState()

    const [showModalDialog, setshowModalDialog] = useState(false);
    const [showModalDialog2, setshowModalDialog2] = useState(false);
    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const SaveSP = () => {
        let objSP = { ten_sp: name, gia: gia, hang: brand, image: img_base64 };

        fetch(url_pro, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status == 201)
                    alert("Thêm thành công")
                setshowModalDialog(false)
                reloadData()

            }).catch((e) => {
                console.log(e);
            });
    }
    const Update = () => {

        let objSP = { id: id, ten_sp: name, gia: gia, hang: brand, image: img_base64 };

        let url_pro = 'http://172.19.200.210:3000/sanpham' + id;

        fetch(url_pro, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status = 201) {
                    alert("Update thành công");
                    setshowModalDialog("false");
                    getSP()
                }

            })
            .catch((ex) => {
                console.log(ex);
            });

    }

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
    const getData = () => {
        fetch(URL)
            .then((response) => response.json()) // get response, convert to json
            .then((json) => {
                setData(json.data);
                setname(json.name);
                setprice(json.price);
                setbrand(json.brand);
                setimage(json.image)
            })
            .catch((error) => alert(error)) // display errors
            .finally(() => setLoading(false)); // change loading state
    }


    const Card = ({ item }) => {

        // const showDialog = () => {
        //     setVisible(true);
        // };

        const toggleModal = () => {
            setshowModalDialog(!showModalDialog);
        };
        const ModalUpdate = () => {
            toggleModal();
            setid(item.id)
            setname(item.ten_sp);
            setgia(item.gia);
            setbrand(item.hang)

        };



        const createTwoButtonAlert = () =>
            Alert.alert('Xoa sp', "Xóa san pham: " + item.name, [
                {
                    text: 'cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {

                        let url_pro = "http://192.168.1.6:3000/api/sp/" + item._id;

                        fetch(url_pro, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response = 200) {
                                    getData();
                                    alert("Xóa thành công")
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });

                    },
                },
            ]);

        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}>
                <View style={styles.card}>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
                        <Image style={{ height: 100, width: 100 }}
                            source={{ uri: `${item.image}` }} />
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                            {item.brand}
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
                            ${item.price}
                        </Text>
                        <View style={styles.addToCartBtn}>
                            <Icon name="edit" size={20} color={COLORS.white} onPress={ModalUpdate} />
                        </View>
                        <View style={styles.addToCartBtn}>
                            <Icon name="delete" size={20} color={COLORS.white} onPress={createTwoButtonAlert} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    useEffect(() => {
        getData();
    }, []);
    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    console.log(img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, marginRight: 350 }}>Back</Text>
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
                <View style={styles.sortBtn}>
                    <Icon name='add' size={28} color={COLORS.white} onPress={() => { setshowModalDialog(true) }} />
                </View>

            </View>
            {/* add san pham */}
            <View>
                <Modal visible={showModalDialog}>
                    <View style={styles.container}>
                        <Icon name="arrow-back-ios" size={28} onPress={() => {
                            setshowModalDialog(false)
                        }} />
                        <Text style={{ fontSize: 20, marginRight: 300 }}>Back</Text>
                    </View>
                    <View style={styles.Khung_dialog}>
                        <Text>Thêm sản phẩm</Text>
                        <TextInput style={styles.input}
                            placeholder="tên"
                            onChangeText={(txt) => { setname(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="hãng"
                            onChangeText={(txt) => { setbrand(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="giá "
                            onChangeText={(txt) => { setprice(txt) }}
                        >
                        </TextInput>
                        <View style={styles.drdown}>
                            <DropDownPicker
                                placeholder="Chon Hang"
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />
                        </View>
                        <View style={{ margin: 10 }} />
                        <Button title="Add Picture" onPress={pickImage} />
                        <View style={{ margin: 5 }} />
                        {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200, marginLeft: 75 }} />}
                        <View style={{ margin: 5 }} />
                        <Button
                            title="Thêm"
                            onPress={
                                SaveSP
                            } />

                    </View>
                </Modal>

                {/* update san pham */}
                <Modal visible={showModalDialog}>
                    <View style={styles.container}>
                        <Icon name="arrow-back-ios" size={28} onPress={() => {
                            setshowModalDialog2(false)
                        }} />
                        <Text style={{ fontSize: 20, marginRight: 300 }}>Back</Text>
                    </View>
                    <View style={styles.Khung_dialog}>
                        <Text>Thêm sản phẩm</Text>
                        <TextInput style={styles.input}
                            placeholder="tên"
                            onChangeText={(txt) => { setname(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="hãng"
                            onChangeText={(txt) => { setbrand(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="giá "
                            onChangeText={(txt) => { setprice(txt) }}
                        >
                        </TextInput>
                        <View style={styles.drdown}>
                            <DropDownPicker
                                placeholder="Chon Hang"
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />
                        </View>
                        <View style={{ margin: 10 }} />
                        <Button title="Add Picture" onPress={pickImage} />
                        <View style={{ margin: 5 }} />
                        {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200, marginLeft: 75 }} />}
                        <View style={{ margin: 5 }} />
                        <Button
                            title="Thêm"
                            onPress={
                                Update
                            } />
                        <Button
                            title="huy"
                            onPress={() => {
                                setshowModalDialog2(false)
                            }} />

                    </View>
                </Modal>
            </View>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => <Card item={item} />}
            />
        </SafeAreaView>
    )
}
export default Add;
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
    Khung_dialog: {
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        height: '100%',
        width: '95%'
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    button:
    {
        width: 100,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#1d8bf1",
    },
    drdown: {
        width: 150,
        height: 50,
        zIndex: 10,
        marginLeft: 115,

    },
})