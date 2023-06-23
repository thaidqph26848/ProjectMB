import { Text, View, ActivityIndicator, FlatList, Image, Button, Alert, TouchableOpacity } from "react-native";
import st from "./Button/styles";
import { useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GioHang = (props) => {

    const tinhTongGia = () => {
        let giaTong = 0;
        for (let i = 0; i < dsPro.length; i++) {
            giaTong += Number(dsPro[i].price);
        }
        setTongGia(giaTong);
    };


    const [tongGia, setTongGia] = useState(0);

    const [dsPro, setdsPro] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const getListPro = async () => {
        let url_api_giohang = 'http://192.168.1.22:3000/giohang'

        try {
            const response = await fetch(url_api_giohang);
            const json = await response.json();
            setdsPro(json);
        } catch (e) {
            console.log(e);
        } finally {
            setisLoading(false)

        }
    }



    const renderPro = ({ item }) => {


        const DelPro = () => {
            let url_api_del = 'http://192.168.1.22:3000/giohang/' + item.id;

            fetch(url_api_del, {

                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.status == 200) {
                    alert("đã xóa");
                    getListPro();
                }
            })
                .catch((e) => {
                    console.log(e);
                })
        }

        const showAlert = () => {
            Alert.alert('chức năng xóa ', 'bạn có chắc muốn xóa và không mua sản phẩm này ?',
                [
                    {
                        text: "xóa",
                        onPress: () => {
                            DelPro();
                        }

                    },

                    {
                        text: "thoát",
                        onPress: () => {

                        }
                    }

                ])
        }


        return (
            <View style={st.render_giohang}>
                <View style={{ padding: 10 }}>
                    <Image
                        style={{ width: 80, height: 85 }}
                        source={{ uri: item.image }} /></View>
                <View style={{ width: 200, height: 80, marginTop: 10, padding: 5 }}>
                    <Text>tên sản phẩm : {item.ten_sp}</Text>
                    <Text>hang : {item.hang}</Text>
                    <Text>giá : {item.gia}</Text>

                </View>
                <View style={{ padding: 5 }}>


                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, height: 30, width: 80, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#c1c1c1', marginTop: 10 }} onPress={() => { props.navigation.navigate('HoaDon', { item_chitiet: item },) }} >
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}> Buy Now</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, height: 30, width: 80, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#c1c1c1', marginBottom: 15 }} onPress={showAlert} >
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}> Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    React.useEffect(() => {
        const unsubcribe = props.navigation.addListener('focus', () => {
            getListPro();
            tinhTongGia();
        });
        return unsubcribe
    }, [props.navigation]);

    React.useEffect(() => {
        tinhTongGia();
    }, [dsPro]);


    return (
        <View style={st.container}>
            <Text style={{ fontSize: 50 }}>Giỏ hàng</Text>
            {
                (isLoading) ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={dsPro}
                        keyExtractor={(item_sp) => { return item_sp.id }}
                        renderItem={renderPro}
                    />
                )
            }
        </View>
    )
}
export default GioHang