import { StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Input, Button } from "react-native-elements";
import { useEffect, useState } from "react";

import axios from "axios";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

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
      <Input
        placeholder="Username"
        autoCapitalize="none"
        leftIcon={{ type: "font-awesome", name: "user" }}
        leftIconContainerStyle={styles.usernameIconContainerStyle}
        onChangeText={setLogin}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        leftIcon={{ type: "font-awesome", name: "lock" }}
        leftIconContainerStyle={styles.passwordIconContainerStyle}
        rightIcon={
          hidePassword
            ? {
                type: "font-awesome",
                name: "eye-slash",
                onPress: () => setHidePassword(!hidePassword),
              }
            : {
                type: "font-awesome",
                name: "eye",
                onPress: () => setHidePassword(!hidePassword),
              }
        }
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Button
        title="Login"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
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
