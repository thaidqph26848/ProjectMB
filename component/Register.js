import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [id, setid] = useState("");

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
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


      FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setAvatar("data:image/" + file_ext + ";base64," + res);
          console.log(avatar);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });


    }
  }
  const addUser = () => {
    let url_login = 'http://172.19.200.210:3000/user?username=' + username;

    fetch(url_login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        fullname: fullname,
        avatar: avatar

      }),
    })
      .then(async (res) => {

        if (res.status == 201) {
          fetch(url_login)
            .then((res) => { return res.json() })
            .then(async (res_login) => {
              if (res_login.length != 1) {
                alert('Sai username hoac loi trung lap du lieu')
                return
              } else {
                let objUser = res_login[0]

                try {
                  await AsyncStorage.setItem('loginInfo', JSON.stringify(objUser))
                  navigation.navigate('Login')
                } catch (error) {
                  console.log(error);
                }

              }
            })
            .catch((err) => {
              console.log(err);
            })
        }


      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  return (
    <ImageBackground style={{ height: '100%', width: '100%' }} source={require('./image/backgroung.png')} resizeMode='stretch' >
      <View style={styles.header}>

        <TouchableOpacity style={{ height: '100%', aspectRatio: 1, position: 'relative', left: 0, width: 40, padding: 4, margin: 2 }}
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <Image style={{ width: '100%', height: '100%' }} source={require('./image/arrow.png')} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1, }}>
        <Image style={{ width: '97%', height: 10, padding: 50, margin: 5 }} source={require('./image/signup.png')} />
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='position'>

            <View >
              <TouchableOpacity onPress={pickImage}>
                {
                  avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  ) : (
                    <Image source={require('./image/user.jpg')} style={styles.avatar} />
                  )
                }
              </TouchableOpacity>
              <View style={styles.textInput}>
                <TextInput style={{ color: '#FFF', fontSize: 18, }}
                  placeholder="Username"
                  placeholderTextColor="#FFF"
                  onChangeText={(txt) => setusername(txt)}
                ></TextInput>
              </View>

              <View style={styles.textInput}>
                <TextInput style={{ color: '#FFF', fontSize: 18 }}
                  placeholder='Fullname'
                  placeholderTextColor="#FFF"
                  onChangeText={(txt) => setfullname(txt)}
                ></TextInput>
              </View>

              <View style={styles.password}>
                <TextInput style={{ color: '#FFF', fontSize: 18, }}
                  placeholder="Password"
                  placeholderTextColor="#FFF"
                  onChangeText={(txt) => setpassword(txt)}
                ></TextInput>
              </View>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.loginBtn}
            onPress={addUser}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>


        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    paddingHorizontal: 50
  },
  title: {
    textAlign: 'center',
    margin: 10,
    padding: 10,
    fontSize: 35,
    color: '#fff'
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: "100%",
    height: 45,
    marginBottom: 20,
    color: '#fff',
    fontSize: 50
  },
  header: {
    padding: 5,
    width: "100%",
    height: 45,
    fontSize: 100,
    color: '#fff',
    paddingRight: 45
  },
  password: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: "100%",
    height: 45,
    marginBottom: 50,
    fontSize: 100,
    color: '#fff',
    paddingRight: 45
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#FFF'
  },
  loginBtn:
  {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d8bf1",
    marginLeft: 40
  },
  singup: {
    color: '#1d8bf1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    marginTop: 10,
    textAlign: 'center',
    right: 0,
    borderRadius: 50,
    padding: 6,
    color: 'white'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    marginLeft: 130,
    marginBottom: 40

  }
})