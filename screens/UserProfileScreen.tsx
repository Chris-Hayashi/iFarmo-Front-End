import { useState, useEffect, version } from 'react';
import { StyleSheet, FlatList, Animated, View, ScrollView } from 'react-native';
import { Card, Button, Icon, Text, Image } from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import navigation from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import EditProfileOverlay from '../components/EditProfileOverlay';
import User from '../components/objects/User';
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
    const [editProfileOverlayVisible, setEditProfileOverlayVisible] = useState(false);
    const [render, setRender] = useState(false);

    const apiBaseURL = 'https://nodejs-ifarmo.herokuapp.com/api/'

    useEffect(() => {
        console.log('userProfile rendered');
        getUser();
    }, [render]);

    // let user : User = new User();

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

        await axios.get(apiBaseURL + 'users/' + userId)
            .then(res => {
                // not sure how to get this to work @CHRIS
                // console.log("getUser res: ", res);
                setName(res.data.name);
                setContactInfo(res.data.contactInfo);
                setEmail(res.data.email);
                // console.log('role: ', res.data.role);
                // console.log('role: ', res.data.role.charAt(0).toUpperCase() + res.data.role.slice(1))
                setRole(res.data.role);
                setBio(res.data.bio);

            })
            .catch(err => {
                alert(err.response.request._response);
                console.log(err.response.request._response);
            });
    }

    //get and set user information from the user id
    return (
        <View style={styles.container}>
            <ScrollView style={{ flexGrow: 1, paddingRight: 0, paddingTop: 20, marginTop: 0, marginRight: 0}}>
                <View style={{ flexDirection: 'column', paddingBottom: 60}}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{
                                uri: //replace this with profile pic link
                                    'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                            }}
                            style={styles.profileImage}
                        />

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text h3={true} style={styles.name}>{name}</Text>
                            <Button
                                title='Edit Profile'
                                titleStyle={{ fontWeight: 'bold' }}
                                buttonStyle={styles.editBtn}
                                containerStyle={{
                                    // position: 'absolute',
                                    width: 200,
                                    alignSelf: 'center'
                                    // margin: 'auto'
                                    // marginHorizontal: 50,
                                    // marginVertical: 10,
                                }}
                                icon={
                                    <Icon
                                        name="edit"
                                        color="#ffffff"
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                onPress={() => setEditProfileOverlayVisible(!editProfileOverlayVisible)}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', alignSelf: 'flex-start', marginLeft: 10, marginVertical: 25 }}>
                        <Text style={styles.phone}>Phone: {contactInfo}</Text>
                        <Text style={styles.email}>Email: {email}</Text>
                        <Text style={styles.role}>Role: {role.charAt(0).toUpperCase() + role.slice(1)}</Text>
                    </View>

                    <Text h4={true} style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 }}>Bio</Text>
                    {/* <ScrollView style={{marginBottom: 60 }}> */}
                    <View style={styles.bio}>
                        <Text style={{ fontSize: 16 }}>{bio}</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil ullam vel id qui corrupti veniam accusamus ducimus, suscipit ab repellat officiis alias atque, nostrum commodi facilis! Unde, reiciendis cumque?</Text>
                    </View>
                    {/* </ScrollView> */}

                </View>
            </ScrollView>

            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 30 }}> */}
            {/* <Button
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
                    onPress={() => setEditProfileOverlayVisible(!editProfileOverlayVisible)}
                /> */}
            {/* </View> */}

            <EditProfileOverlay
                name={name}
                email={email}
                role={role}
                contactInfo={contactInfo}
                bio={bio}
                isVisible={editProfileOverlayVisible}
                onBackdropPressHandler={() => setEditProfileOverlayVisible(!EditProfileOverlay)}
                renderUserProfile={() => setRender(!render)}
            />

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFF5EA',
        // backgroundColor: 'blue',
        // marginTop: 25,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0
        // paddingTop: 20,
        // paddingRight: 0,
        // paddingBottom: 30
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
        // height: 200
    },
    editBtn: {
        backgroundColor: '#1F802A',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 0
    }
});