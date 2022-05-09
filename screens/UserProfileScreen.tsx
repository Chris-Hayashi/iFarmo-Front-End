import { useState, useEffect, version } from 'react';
import { StyleSheet, FlatList, Animated, View, ScrollView } from 'react-native';
import { Card, Button, Icon, Text, Image } from 'react-native-elements';
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
    const [email, setEmail] = useState('');
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
                setEmail(res.data.email);
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
            <ScrollView style={{marginBottom: 60}}>
                <View style={{ flexDirection: 'column' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{
                                uri: //replace this with profile pic link
                                    'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                            }}
                            style={styles.profileImage}
                        />

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>

                            <Text h3={true} style={styles.name}>{name}</Text>
                            {/* <Text style={styles.phone}>Phone: {contactInfo}</Text>
                    <Text style={styles.email}>Email: {email}</Text> */}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', alignSelf: 'flex-start', marginLeft: 10, marginVertical: 25 }}>
                        <Text style={styles.phone}>Phone: {contactInfo}</Text>
                        <Text style={styles.email}>Email: {email}</Text>
                        <Text style={styles.role}>Role: {role}</Text>
                    </View>

                    <Text h4={true} style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 }}>Bio</Text>
                    <View style={styles.bio}>
                        {/* <ScrollView> */}

                        <Text style={{ fontSize: 16 }}>{bio}</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus commodi dolorem modi, dicta tempore ratione incidunt. Eligendi ratione unde mollitia deserunt et rerum perspiciatis quae consectetur? Pariatur veniam obcaecati aperiam.</Text>
                        {/* </ScrollView> */}
                    </View>

                </View>
            </ScrollView>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 30}}>
                <Button
                    title='Edit Profile'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={styles.editBtn}
                    containerStyle={{
                        position: 'absolute',
                        width: 200,
                        // margin: 'auto'
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
                // onPress={() => {
                //     // putUser();
                //     navigation.navigate('EditProfile');
                // }}
                />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFF5EA',
        // marginTop: 25,
        padding: 20
    },
    row: {
        padding: 4,
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    profileImage: {
        alignSelf: 'flex-start',
        minWidth: 130,
        minHeight: 130,
        borderRadius: 100
    },
    name: {
        // flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    phone: {
        fontSize: 16,
    },
    email: {
        fontSize: 16,
    },
    role: {
        fontSize: 16
    },
    bio: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'grey',
        marginHorizontal: 5,
        marginBottom: 0,
        padding: 10,
        // height: '50%'
    },
    editBtn: {
        backgroundColor: '#1F672A',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 0
    }
});