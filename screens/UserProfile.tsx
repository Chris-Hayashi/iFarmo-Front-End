import { useState, useEffect, version } from 'react';
import { StyleSheet, FlatList, Animated, View, Text, Image } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import navigation from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { RootStackScreenProps } from '../types';
// const jwt = require("jsonwebtoken");

/* useEffect runs a function everytime the page renders, depending on what is inside the second parameter 
 * if second parameter is empty, useEffect gets called only once (on first render)
 * if variable is in second parameter, useEffect gets called everytime that variable changes
*/

export default function UserProfile({ navigation }: RootStackScreenProps<'UserProfile'>) {

    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');

    const apiBaseURL = 'https://nodejs-ifarmo.herokuapp.com/api/'

    useEffect(() => {
        getUser();
    }, []);

    const getUserId = async () => {
        var userId = ""
        try {
            const token = await AsyncStorage.getItem('auth-token');
            if (token != null) {
                var decoded_token: { _id: string } = jwt_decode(token);
                console.log("decoded token: ", decoded_token);
                userId = decoded_token._id;
            }
        }
        catch (e) {
            console.log("damn it");
        }
        return userId;
    }

    //get user information
    const getUser = async () => {
        const userId = await getUserId();

        axios.get(apiBaseURL + 'users/' + userId)
            .then(res => {
                // not sure how to get this to work @CHRIS
                console.log("getUser res: ", res);
                setName(res.data.name);
                setContactInfo(res.data.contactInfo);
                setRole(res.data.role);
                setBio(res.data.bio);
            })
            .catch(err => {
                alert(err.response.request._response);
                console.log(err.response.request._response);
            });
    }

    //set user info 
    const NameText = () => {
        return (<Text style={styles.row}>{name}</Text>);
    }

    const OccupationText = () => {
        console.log("role: ", role);
        return (<Text style={styles.row}>Occupation: {role}</Text>);
    }

    const LocationText = () => {
        return (<Text style={styles.row}>Location: </Text>);
    }

    const BioText = () => {
        return (<Text style={styles.row}>Bio: {bio}</Text>);
    }

    const ContactText = () => {
        return (<Text style={styles.row}>Contact Information: {contactInfo}</Text>);
    }

    //get and set user information from the user id
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />
                <Card.Image
                    style={{ padding: 0 }}
                    source={{
                        uri: //replace this with profile pic link
                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    }}
                />
                {/* <Text>{ }</Text> */}
                <OccupationText />
                <LocationText />
                <BioText />
                <ContactText />
                {/* <Button onPress={() => navigation.navigate('EditProfile')}>
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
                </Button> */}
                <Button
                    title='Edit Profile'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: 'green',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    icon={
                        <Icon
                            name="edit"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={() => {
                        // putUser();
                        navigation.navigate('EditProfile');
                    }}
                />
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