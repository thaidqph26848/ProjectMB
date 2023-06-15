import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [getPasswordVisible, setPasswordVisible] = useState(false)


  const doLogin = () => {
    //check
    if (username.length == 0) {
      alert("chua nhap username");
      return;
    }
    if (password.length == 0) {
      alert("chua nhap password");
      return;
    }

    //lay data

    let url_login = 'http://192.168.1.22:3000/user?username=' + username;

    fetch(url_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_json) => {
        if (res_json.length != 1) {
          alert("nhap lai username");
          return;
        }
        let objU = res_json[0];
        if (objU.password != password) {
          alert("nhap lai password");
          return;
        }

        try {
          await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
          navigation.navigate('TabMenu')
        } catch (e) {
          // saving error
          console.log(e);
        }
      })
  }
  return (
    <ImageBackground style={{ height: '100%', width: '100%' }} source={require('./image/backgroung.png')} resizeMode='stretch' >
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1,backgroundColor: '#061f33' }}>
        <View style={styles.container}>
          <Image style={{ width: '100%', height: '22%', padding: 50, margin: 30 }} source={require('./image/logostore2.png')} />
          <Text style={styles.title}>
            WELCOME
          </Text>
          <View style={styles.textInput}>
            <TextInput style={{ color: '#94cbf4', fontSize: 18 }}
              placeholder='Username'
              placeholderTextColor="#94cbf4"
              onChangeText={(txt) => {
                setusername(txt)
              }}
            ></TextInput>
          </View>

          <View style={styles.password}>
            <TextInput style={{ color: '#94cbf4', fontSize: 18, }}
              placeholder="Password"
              placeholderTextColor="#94cbf4"
              secureTextEntry={getPasswordVisible ? false : true}
              onChangeText={(txt) => {
                setpassword(txt)
              }}
            ></TextInput>

            <TouchableOpacity style={{ height: '100%', aspectRatio: 1, position: 'absolute', right: 0, width: 40, padding: 4, margin: 7 }}
              onPress={() => {
                setPasswordVisible(!getPasswordVisible)
              }}
            >
              <Image style={{ width: '100%', height: '100%' }} source={require('./image/key.png')} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn}
            onPress={doLogin}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <View>
            <Text style={{color:'#94cbf4'}}>Don't have account?
              <Text style={styles.singup}
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>

      </SafeAreaView>
      </ImageBackground>
  )
}
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    margin: 10,
    padding: 10,
    fontSize: 35,
    color: '#94cbf4'
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#94cbf4',
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
    color: '#94cbf4',
    fontSize: 50
  },
  password: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#94cbf4',
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
    fontSize: 100,
    color: '#94cbf4',
    paddingRight: 45
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#94cbf4'
  },
  loginBtn:
  {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#94cbf4",
  },
  singup: {
    color: '#94cbf4',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  }
})