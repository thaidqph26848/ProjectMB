import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HoaDon from './component/HoaDon';
import Statistical from './component/Statistical';
import Login from './component/Login';
import TrangChu from './component/TrangChu';
import ThongTin from './component/ThongTin';
import GioHang from './component/GioHang';
import ChiTietSP from './component/ChiTietSP';
import EditProfile from './component/EditProfile';
import Add from './component/Add';
import Register from './component/Register';
import SplassScreen from './component/SplassScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator initialRouteName="TrangChu" screenOptions={{ headerShown: false }}>
      <Tab.Screen name='TrangChu' component={TrangChu}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./component/image/homeicon.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='GioHang' component={GioHang}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./component/image/shopping.png')} resizeMode="stretch" />

          )
        }}
      />
      <Tab.Screen name='ThongTin' component={ThongTin}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 30, height: 30 }} source={require('./component/image/profile.png')} resizeMode="stretch" />

          )
        }}
      />
    </Tab.Navigator>
  )

}


export default App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */}

      <Stack.Navigator initialRouteName="SplassScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Main" component={Main}  />
        <Stack.Screen name="Comment" component={Comment} /> */}
        <Stack.Screen name="TrangChu" component={TrangChu} />
        <Stack.Screen name='ThongTin' component={ThongTin} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='GioHang' component={GioHang} />
        <Stack.Screen name='ChiTietSP' component={ChiTietSP} />
        <Stack.Screen name='TabMenu' component={TabMenu} />
        <Stack.Screen name='Add' component={Add} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='SplassScreen' component={SplassScreen}/>
        <Stack.Screen name='HoaDon' component={HoaDon}/>
        <Stack.Screen name='Statistical' component={Statistical}/>
      </Stack.Navigator>

    </NavigationContainer>

  )
}

