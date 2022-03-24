import { StyleSheet, TextInput } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Input, Button } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {

  /* State */
  const [firstRender, setFirstRender] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameErrorMsg, setFullNameErrorMsg] = useState('');
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [validForm, setValidForm] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {
    /*Cancel out the state*/
    /*Runs everytime a state changes*/

    // console.log('rendered');
    setErrorMsgs();
  })

  const registerBtnHandler = () => {

    let inputValidFlag = true
    setFirstRender(false);
    setErrorMsgs();

    /* If form is valid */
    if (validForm) {
      console.log("if (validForm) entered")
      var userObj = {
        'name': fullName,
        'username': username,
        'password': password,
        'email': email,
      };

      /* Then post user to database */
      axios.post('https://nodejs-ifarmo.herokuapp.com/api/auth/register', userObj)
        .then(res => {
          // res.data to access token
          alert("You successfully registered");
          console.log(res);

          /* Go back to login page */
          navigation.navigate('Login');
        })
        .catch(err => {
          alert(err.response.request._response);
          console.log(err.response.request._response);
        });
    }
  }

  const setErrorMsgs = () => {

    setFullNameErrorMsg('');
    setUsernameErrorMsg('');
    setPasswordErrorMsg('');

    if (fullName.length == 0) {
      setFullNameErrorMsg('Full name is required');
      setValidForm(false);
    }
    if (username.length == 0) {
      setUsernameErrorMsg('Username is required');
      setValidForm(false);
    }
    if (password.length < 8 || password.length > 30) {
      setPasswordErrorMsg('Password must be between 8 and 30 characters');
      setValidForm(false);
      // inputValidFlag = false;
    }
    if (fullNameErrorMsg == '' && usernameErrorMsg == '' && passwordErrorMsg == '')
      setValidForm(true);
  }


  const cancelHandler = () => {
    /*You go back to the home page*/
    navigation.navigate('Home');
  }

  return (

    <View style={styles.container}>

      {/* User Input */}
      <Input placeholder='Username' autoCapitalize='none' onChangeText={setUsername}
      />
      {usernameErrorMsg.length > 0 && !firstRender && <Text style={styles.textDanger}>{usernameErrorMsg}</Text>}

      <Input placeholder='Password' autoCapitalize='none' onChangeText={setPassword} />
      {passwordErrorMsg.length > 0 && !firstRender && <Text style={styles.textDanger}>{passwordErrorMsg}</Text>}

      <Input placeholder='E-Mail' autoCapitalize='none' onChangeText={setEmail} />
      {/* {passwordErrorMsg.length > 0 && !firstRender && <Text style={styles.textDanger}>{passwordErrorMsg}</Text>} */}


      <Input placeholder='Full Name' onChangeText={setFullName} />
      {fullNameErrorMsg.length > 0 && !firstRender && <Text style={styles.textDanger}>{fullNameErrorMsg}</Text>}


      {/* <Input placeholder='Password' onChangeText={setPassword} /> */}

      {/* Register Button */}
      <Button
        title='Register'
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
        onPress={registerBtnHandler}
      />
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
  textDanger: {
    color: "#dc3545"
  }
});