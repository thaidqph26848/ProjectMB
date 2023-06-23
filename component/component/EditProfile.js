import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
let strKey = 'loginInfo'
const EditProfile = ({navigation}) => {
  const [fullname, setfullname] = useState("");
  const [avatar, setAvatar] = useState(null)
  const [id, setid] = useState('')
  const [username, setusername] = useState(null);
  const [password, setPassword] = useState(null)
  
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
          setAvatar('data:image/' + file_ext + ';base64,' + res)
          console.log(avatar);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
          updateUser()
        });
    }
  }

  const updateUser = () => {
    let url_user = 'http://192.168.1.22:3000/user/' + id;
    let objUser = {
      username: username,
      password: password,
      fullname: fullname,
      avatar: avatar,
      id: id
    }

    fetch(url_user, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    })
      .then(async (res) => {
        if (res.status == 200) {
          try {
            console.log(objUser);
            await AsyncStorage.setItem(strKey, JSON.stringify(objUser))
            console.log('update anh thanh cong')
            navigation.navigate('ThongTin')
          } catch (error) {
            console.log(error);
          }
        }

      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  React.useEffect(() => {
    getData()
})
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={pickImage}>
                {
                  avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  ) : (
                    <Image source={require('./image/user.jpg')} style={styles.avatar} />
                  )
                }
              </TouchableOpacity> 
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter UserName"
        
          onChangeText={setusername}
        />
        <Text style={styles.label}>Fullname</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
         
          onChangeText={setfullname}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
        
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={updateUser}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default EditProfile;