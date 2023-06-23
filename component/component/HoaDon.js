import { Text, View, Image, TextInput, TouchableHighlight, Alert, TouchableOpacity } from "react-native";
import st from "./Button/styles";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const HoaDon = ({ navigation, route }) => {

  const DelPro = () => {
    let url_api_del = 'http://192.168.1.22:3000/giohang/' + route.params.item_chitiet.id;

    fetch(url_api_del, {

      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status == 200) {


      }
    })
      .catch((e) => {
        console.log(e);
      })
  }



  const [image, setimage] = useState(route.params.item_chitiet.image);
  const [ten_sp, setten_sp] = useState(route.params.item_chitiet.ten_sp);
  const [gia, setgia] = useState(route.params.item_chitiet.gia);




  const [count, setCount] = useState(1);
  const onPress = () => setCount(count + 1);
  const onPress1 = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  };


  const Save_UserMua = () => {
    let objUserMua = { image: image, ten_sp: ten_sp, gia: gia * count, soluong: count}
    let url_api_hoadon = 'http://192.168.1.22:3000/hoadon'

    fetch(url_api_hoadon, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUserMua)
    }).then((res) => {
      if (res.status == 201)

        alert("đặt hàng thành công")
      DelPro();

    })
      .catch((e) => {
        console.log(e);
      })


  }


  return (
    <View style={st.container}>
      <View style={{ width: 400, height: 750, borderWidth: 1, borderRadius: 20, backgroundColor: '#DDEEFF', padding: 30 }}>
        <View style={st.v3}>
          <Image

            style={{ width: 250, height: 200, marginLeft: 60 }}
            source={{ uri: route.params.item_chitiet.image }} />
        </View>
        <Text style={st.td} >tên sản phẩm:  {route.params.item_chitiet.ten_sp}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>giá: {route.params.item_chitiet.gia}</Text>

        <Text style={{ padding: 10 }}>so luong</Text>
        <View style={{ flexDirection: 'row' }}>

          <TouchableHighlight onPress={onPress1} style={{
            width: 30, borderRadius: 30, marginBottom: 5,
            height: 30,
          }}>
            <View style={st.button}>
              <Text>-</Text>
            </View>
          </TouchableHighlight>


          <View style={st.countContainer}>
            <Text style={st.countText}>{count}</Text>
          </View>
          <TouchableHighlight onPress={onPress} style={{
            width: 30, borderRadius: 30,
            height: 30,
          }}>
            <View style={st.button}>
              <Text>+</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text style={{ marginTop: 10, color: 'red', fontSize: 20, fontWeight: 'bold' }}> tổng tiền: {Number(Number(count) * Number(route.params.item_chitiet.gia))}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, height: 50, width: '40%', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#c1c1c1', marginBottom: 10 }} onPress={Save_UserMua} >
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>Đặt mua</Text>
        </TouchableOpacity></View>
    </View>
  )
}


export default HoaDon