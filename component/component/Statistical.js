import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import st from "./Button/styles";
import Icon from "react-native-vector-icons/FontAwesome";
const Statistical = (props) => {
 
  const [dsSanPham, setDsSanPham] = useState([]);

  const [isLoadingSanPham, setIsLoadingSanPham] = useState(true);
 



  const getListPro = async () => {
    const url_api_hoadon = 'http://192.168.1.22:3000/hoadon';

    try {
      const response = await fetch(url_api_hoadon);
      const json = await response.json();
      setDsSanPham(json);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingSanPham(false);
    }
  };



  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getListPro();
   
 
    });
    return unsubscribe;s
  }, [props.navigation]);

  const renderSanPham = ({ item }) => {
    return (
      <View style={{    backgroundColor:'#DDEEFF', padding: 2, margin: 10, flexDirection: 'row' , width:380, borderRadius:10}}>
        <View style={{ padding: 10 }}>
          <Image
            style={{ width: 80, height: 85 }}
            source={{ uri: item.image }} />
        </View>
        <View style={{ marginTop: 10, padding: 5 }}>
          <Text style={{fontWeight:'bold', fontSize:18, color:'red'}}>Tên sản phẩm: {item.ten_sp}</Text>
          <Text>Số lượng: {item.soluong}</Text>
          <Text>Tổng: {item.gia}</Text>
          
        </View>
      </View>
    );
  };



  return (
    <View style={st.container}>
      
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Danh sách sản phẩm đã mua</Text>
        {isLoadingSanPham ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dsSanPham}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSanPham}
          />
        )}
       
      </View>
      
    </View>
  );
};

export default Statistical;