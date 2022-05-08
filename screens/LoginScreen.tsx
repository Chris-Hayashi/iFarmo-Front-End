import { StyleSheet, TextInput, View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Image, Input, Button } from "react-native-elements";
import { useEffect, useState } from "react";

import axios from "axios";

export default function LoginScreen({ navigation }: RootStackScreenProps<"Login">) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const iFarmoLogo = () => {
    return require('../assets/logos/ifarmo_logo.png');
  }

  const loginBtnHandler = () => {
    const userObj = {
      login: login,
      password: password,
    };

    axios
      .post("https://nodejs-ifarmo.herokuapp.com/api/auth/login", userObj)
      .then((res) => {
        setAuthToken(res.headers["auth-token"]);
        getAuthToken();
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  };

  const setAuthToken = async (authToken: string) => {
    await AsyncStorage.setItem("auth-token", authToken);
  };

  const getAuthToken = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    console.log("localStorage token: ", token);
  };

  const signUpBtnHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>

      {/* User Input */}
      <View style={{ alignItems: 'center', marginTop: 100, backgroundColor: '#FFF5EA', }}>
        <Image containerStyle={styles.iFarmoLogo} source={require('../assets/logos/ifarmo_logo.png')} />
        {/* <Image containerStyle={styles.iFarmoTitle} source={require('../assets/logos/ifarmo_title.png')} /> */}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center' }}>
        <Image containerStyle={styles.iFarmoTitle} source={require('../assets/logos/ifarmo_title.png')} />
      </View>

      <KeyboardAvoidingView style={styles.userInput}>
        <Input
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={{ type: "font-awesome", name: "user", color: "#1F622A" }}
          leftIconContainerStyle={styles.usernameIconContainerStyle}
          onChangeText={setLogin}
        />
        <Input
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={hidePassword}
          leftIcon={{ type: "font-awesome", name: "lock", color: "#1F622A" }}
          leftIconContainerStyle={styles.passwordIconContainerStyle}
          rightIcon={
            hidePassword
              ? {
                type: "font-awesome",
                name: "eye-slash",
                color: '#1F622A',
                onPress: () => setHidePassword(!hidePassword),
              }
              : {
                type: "font-awesome",
                name: "eye",
                color: '#1F622A',
                onPress: () => setHidePassword(!hidePassword),
              }
          }
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: "#1F672A",
            // borderWidth: 2,
            // borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={loginBtnHandler}
        />

        {/* Signup Link */}
        <View style={styles.signUpView}>
          <Text>or </Text>
          <Text style={styles.signUpLink} onPress={signUpBtnHandler}>
            Sign up?
          </Text>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#FFF5EA',
  },
  iFarmoLogo: {
    width: 150,
    height: 150,
    alignContent: 'flex-start',
    backgroundColor: '#FFF5EA',
  },
  iFarmoTitle: {
    minWidth: 225,
    height: 50,
    justifyContent: 'flex-start',
    padding: 'auto'
  },
  userInput: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: '#FFF5EA',
    paddingHorizontal: 30,
    paddingTop: 80,
    marginTop: 0
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  signUpLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  signUpView: {
    marginTop: 10,
    flexDirection: "row",
  },
  usernameIconContainerStyle: {
    paddingRight: 10,
  },
  passwordIconContainerStyle: {
    paddingRight: 12,
  },
});
