import { Text, View, Image, Button, TouchableHighlight, TouchableOpacity } from "react-native";
import st from "./Button/styles";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";


const ChiTietSP = ({ route, navigation }) => {

    const [count, setCount] = useState(0);
    // const onPress = () => setCount(count + 1);
    // const onPress1 = () => {
    //   if (count > 0) {
    //     setCount(count - 1)
    //   }
    // };



    const [sanpham, setsanpham] = useState([]);
    const [ten_sp, setten_sp] = useState(route.params.item_sp.ten_sp);
    const [hang, sethang] = useState(route.params.item_sp.hang);
    const [gia, setgia] = useState(route.params.item_sp.gia);
    const [image, setimage] = useState(route.params.item_sp.image)
    const [mota, setmota] = useState(route.params.item_sp.mota)

    const Save_Pro = () => {
        let objPro = { image: image, ten_sp: ten_sp, gia: gia, mota: mota,hang:hang }
        let url_api_giohang = 'http://192.168.1.22:3000/giohang'

        fetch(url_api_giohang, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objPro)
        }).then((res) => {
            if (res.status == 201)
                alert("them thanh cong")

        })
            .catch((e) => {
                console.log(e);
            })

    }




    return (
        <View style={st.container}>

            <View style={st.b2}>
                <View style={st.v2}>
                    <Image

                        style={{ width: 230, height: 190 }}
                        source={{ uri: route.params.item_sp.image }} />
                </View>
                <Text style={st.td} >tên sản phẩm:  {route.params.item_sp.ten_sp}</Text>
                <Text style={st.ct}>hang: {route.params.item_sp.hang}</Text>
                <Text style={st.ct}>giá: {route.params.item_sp.gia}</Text>
                <Text style={st.ct} >đánh giá: {route.params.item_sp.mota}</Text>
                <Text></Text>


                <Text></Text>
                <View style={{ flexDirection: 'row', alignSelf: "center", marginBottom: 30, marginLeft: 10, marginRight: 10 }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, height: 30, width: '40%', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#c1c1c1', marginBottom: 10 }} onPress={Save_Pro} >
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}> Add to Cart</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, height: 30, width: '40%', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#c1c1c1', marginBottom: 10 }} onPress={() => { navigation.navigate('HoaDon', { item_chitiet: route.params.item_sp }) }} >
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}> Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    )
}
export default ChiTietSP