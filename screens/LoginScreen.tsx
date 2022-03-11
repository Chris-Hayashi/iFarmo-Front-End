import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Input, Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loginBtnHandler = () => {
    const userObj = {
      'login': login,
      'password': password
    };

    axios.post("https://nodejs-ifarmo.herokuapp.com/api/auth/login", userObj)
      .then(res => {
        // console.log(res);
        navigation.navigate('Home');
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const signUpBtnHandler = () => {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>

      {/* User Input */}
      <Input placeholder='Username'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        leftIconContainerStyle={styles.usernameIconContainerStyle}
        onChangeText={setLogin}
      />
      <Input placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        leftIconContainerStyle={styles.passwordIconContainerStyle}
        rightIcon={{ type: 'font-awesome', name: 'eye' }}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Button
        title='Login'
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={loginBtnHandler}
      />

      {/* Signup Link */}
      <View style={styles.signUpView}>
        <Text>or </Text>
        <Text style={styles.signUpLink} onPress={signUpBtnHandler}>Sign up?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  signUpView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  usernameIconContainerStyle: {
    paddingRight: 10
  },
  passwordIconContainerStyle: {
    paddingRight: 12
  },

});

