import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, useEffect } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
let strKey = 'loginInfo'
const ProfileView = ({ navigation }) => {
  const [fullname, setfullname] = useState("");
  const [avatar, setAvatar] = useState(null)
  const [id, setid] = useState('')
  const [username, setusername] = useState(null);
  const [password, setPassword] = useState(null)
  const [sanpham, setsanpham] = useState([]);

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
    let url_user = 'http://192.168.1.22:3000/users/' + id;
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{ uri: 'https://images.pexels.com/photos/1156684/pexels-photo-1156684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        />
        <View style={styles.profileContainer}>

          <TouchableOpacity onPress={pickImage}>
            {
              avatar ? (
                <Image source={{ uri: avatar }} style={styles.profilePhoto} />
              ) : (
                <Image source={require('./image/user.png')} style={styles.profilePhoto} />
              )
            }
          </TouchableOpacity>
          <Text style={styles.nameText}>{fullname}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>4</Text>
          <Text style={styles.statLabel}>Bought</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>10</Text>
          <Text style={styles.statLabel}>Wishlists</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text style={styles.buttonText}>Manage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Statistical</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20
  },
  button1: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,

  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    marginTop: -18,
    textAlign: 'center',
    right: 0,
    borderRadius: 50,
    padding: 6,
    color: 'white'
},
};

export default ProfileView;


