import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar,
    SafeAreaView, Modal, showModalDialog, Button, ScrollView, FlatList, TouchableHighlight, Dimensions, Alert, RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from './colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';
let URL = "http://192.168.1.22:3000/sanpham";
let URL_ADD = "http://192.168.1.22:3000/sanpham?_expand=cat";
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
var dem = 0;
<<<<<<< HEAD
const Add = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [sanpham, setsanpham] = useState([]);
    const [ten_sp, setten_sp] = useState('');
    const [hang, sethang] = useState('');
    const [gia, setgia] = useState('');
    const [mota, setmota] = useState('')
    const [image, setimage] = useState()
    const [id, setid] = useState('')
=======
const url_pro = "http://172.19.200.210:3000/sanpham";
const Add = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [name, setname] = useState('');
    const [brand, setbrand] = useState()
    const [price, setprice] = useState()
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e

    const [showModalDialog, setshowModalDialog] = useState(false);
    const [showModalDialog2, setshowModalDialog2] = useState(false);
    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

<<<<<<< HEAD

    const SaveSP = () => {
        let objSP = { ten_sp: ten_sp, gia: gia, hang: hang, mota: mota, image: img_base64, catId: value };

        fetch(URL, {
=======
    const SaveSP = () => {
        let objSP = { ten_sp: name, gia: gia, hang: brand, image: img_base64 };

        fetch(url_pro, {
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
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
<<<<<<< HEAD
                getSP();
                showModalDialog(false)
=======
                setshowModalDialog(false)
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
                reloadData()

            }).catch((e) => {
                console.log(e);
            });
<<<<<<< HEAD

    }
    const getDrop = () => {
        let url_api_drop = 'http://192.168.1.22:3000/cats';
        fetch(url_api_drop)
            .then((res) => { return res.json(); })
            .then((res_json) => {
                let arr_dropdown = res_json.map((item, index, arr) => {
                    return { label: item.name, value: item.id }
                });
                setItems(arr_dropdown);
            })

    }


=======
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

>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
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
    const getSP = async () => {
        try {
            const response = await fetch(URL_ADD);
            const json = await response.json();
            setsanpham(json);
        } catch (e) {
            console.log(e);
        }

    }


    const Update = () => {

<<<<<<< HEAD
        let objSP = { id: id, ten_sp: ten_sp, gia: gia, mota: mota, hang: hang, image: img_base64, catId: value };

        let url_pro = 'http://192.168.1.22:3000/sanpham/' + id;

        fetch(url_pro, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status = 200) {
                    alert("Update thành công");
                    setshowModalDialog2(false)
                    reloadData();
                  
                }

            })
            .catch((ex) => {
                console.log(ex);
            });

    }

    const Card = ({ item }) => {
        const toggleModal = () => {
            setshowModalDialog2(!showModalDialog2);
=======
        // const showDialog = () => {
        //     setVisible(true);
        // };

        const toggleModal = () => {
            setshowModalDialog(!showModalDialog);
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
        };
        const ModalUpdate = () => {
            toggleModal();
            setid(item.id)
<<<<<<< HEAD
            setten_sp(item.ten_sp);
            setgia(item.gia);
            sethang(item.hang)
            setimage(item.image)
            setmota(item.mota)

        };
=======
            setname(item.ten_sp);
            setgia(item.gia);
            setbrand(item.hang)

        };


>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e

        const createTwoButtonAlert = () =>
            Alert.alert('Xoa sp', "Xóa san pham: " + item.ten_sp, [
                {
                    text: 'cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {

                        let url_pro = "http://192.168.1.22:3000/sanpham/" + item.id;

                        fetch(url_pro, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response = 200) {
                                    getSP();
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.ten_sp}</Text>
                        <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                            {item.cat.name}
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
                            {item.gia} đ
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
        getSP();
        getDrop();
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

                    </View>
                    <View style={styles.Khung_dialog}>
                        <Text>Thêm sản phẩm</Text>
                        <TextInput style={styles.input}
                            placeholder="tên"
<<<<<<< HEAD
                            onChangeText={(txt) => { setten_sp(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="giá "
                            onChangeText={(txt) => { setgia(txt) }}
                        >
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="mo ta "
                            onChangeText={(txt) => { setmota(txt) }}
=======
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
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
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
<<<<<<< HEAD
                    </View>
                </Modal>
            </View>
            <View>
                <Modal visible={showModalDialog2}>
                    <View style={styles.container}>
                        <Icon name="arrow-back-ios" size={28} onPress={() => {
                            setshowModalDialog2(false)}} />
                    </View><View style={styles.Khung_dialog}>
                        <Text>Sua sản phẩm</Text>
                        <TextInput style={styles.input}
                            placeholder="tên"
                            onChangeText={(txt) => { setten_sp(txt); }}
                        >{ten_sp}
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="giá "
                            onChangeText={(txt) => { setgia(txt); }}
                        >{gia}
                        </TextInput>
                        <TextInput style={styles.input}
                            placeholder="mo ta "
                            onChangeText={(txt) => { setmota(txt); }}
                        >{mota}
                        </TextInput>
                        <View style={styles.drdown}>
                            <DropDownPicker
                                placeholder="Chon Hang"
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems} />
                        </View>
                        <View style={{ margin: 10 }} />
                        <Button title="Add Picture" onPress={pickImage} />
                        <View style={{ margin: 5 }} />
                        {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200, marginLeft: 75 }} />}
                        <View style={{ margin: 5 }} />
                        <Button
                            title="Sua"
                            onPress={Update} />
                        <View style={{ margin: 5 }} />


                    </View>
                </Modal>
=======

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
>>>>>>> 3e53373e35ff8eafb1abf04dcf1683f6c4c0ca2e
            </View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={reloading}
                    onRefresh={reloadData} />
            }>
                <SafeAreaView style={{ flex: 1, }}>
                    <FlatList
                        data={sanpham}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item }) => <Card item={item} />}
                    />
                </SafeAreaView>
            </ScrollView>
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