import { useState, version } from 'react';
import { StyleSheet, FlatList, Animated, View, Text, Image } from 'react-native';
import { Card, Button, Icon, Input} from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import navigation from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const jwt = require("jsonwebtoken");

const NameInput = () => {
    return (<Input placeholder='BASIC INPUT'/>);
}

const LocationInput = () =>  {
    return (
        <Input placeholder='Location'/>
    );
}

const getUserId = async () => {
    var userId = ""
    try {
        const token = await AsyncStorage.getItem('token');
        if(token != null){
            var decoded_token = jwt.decode(token);
            userId = token._id;
        }
    }
    catch(e){
        console.log("damn it");
    }
    return userId;
}

const userId = getUserId();
//get user information
const apiBaseURL = 'https://nodejs-ifarmo.herokuapp.com/api/'
axios.put('user/:' + userId)
.then(res => {
    // res.data to access token
    var userName;
})
.catch(err => {
    alert(err.response.request._response);
    console.log(err.response.request._response);
});

//get and set user information from the user id
const EditProfile = () => {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>HELLO WORLD</Card.Title>
                <Card.Divider />
                <Card.Image
                    style={{ padding: 0 }}
                    source={{
                        uri: //replace this with profile pic link
                        'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    }}
                />
                <NameInput/>
                <LocationInput />
                <Button onPress={history.state('/EditProfile')}> 
                    icon={
                        <Icon
                            name="edit"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                title="Edit Profile"
                </Button>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        padding: 5
    },
    row: {
        padding: 4,
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});

const getAuthToken = async() => {
    const token = await AsyncStorage.getItem("auth-token");
    console.log("localStorage token: ", token);
}


export default UserProfile;