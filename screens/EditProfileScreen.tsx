import { useState, useEffect, version } from 'react';
import { StyleSheet, FlatList, Animated, View, Text, Image, Alert } from 'react-native';
import { Card, Button, Divider, Icon, Input } from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import navigation from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { RootStackScreenProps } from '../types';

export default function EditProfile({ navigation }: RootStackScreenProps<'EditProfile'>) {

    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [showDialog, setShowDialog] = useState(true);

    const apiBaseURL = 'https://nodejs-ifarmo.herokuapp.com/api/'

    const editProfileObj = {
        'name': name,
        'role': role,
        'bio': bio,
        'contactInfo': contactInfo
    };

    useEffect(() => {
        getUser();
    }, []);

    const NameInput = () => {
        return (
            <Input
                placeholder='Name'
                defaultValue={name}
                onChangeText={value => editProfileObj.name = value}
            />
        );
    }

    const LocationInput = () => {
        return (
            <Input
                placeholder='Location'
                defaultValue={location}
            />
        );
    }

    const ContactInput = () => {
        return (
            <Input
                placeholder='Contact Info'
                defaultValue={contactInfo}
                onChangeText={value => editProfileObj.contactInfo = value}
            />
        );
    }

    const PasswordInput = () => {
        return (
            <Input placeholder='Password' />
        );
    }

    const BioInput = () => {
        return (
            <Input
                placeholder='Bio'
                defaultValue={bio}
                onChangeText={value => editProfileObj.bio = value}
            />
        );
    }

    const getUserId = async () => {
        var userId = ""
        try {
            const token = await AsyncStorage.getItem('auth-token');
            if (token != null) {
                var decoded_token: { _id: string } = jwt_decode(token);
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
        // console.log("userId: ", userId);

        axios.get(apiBaseURL + 'users/' + userId)
            .then(res => {
                // not sure how to get this to work @CHRIS
                // console.log("getUser res: ", res);
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

    //name, role, bio, and contact info
    const putUser = async () => {
        let token: any = await AsyncStorage.getItem("auth-token");
        const userId = await getUserId();

        axios.put(apiBaseURL + 'users/' + userId, editProfileObj, {
            headers: {
                'auth-token': token
            }
        }).then(res => {
            console.log("putUser res: ", res);
        }).catch(err => {
            alert(err.response.request._response);
            console.log(err.response.request._response);
        });
    }

    const deleteUser = async () => {
        let token: any = await AsyncStorage.getItem("auth-token");
        console.log("token: ", token);

        axios.delete(apiBaseURL + 'users/', {
            headers: {
                'auth-token': token
            }
        }).then(res => {
            console.log("deleteUser() res: ", res);
        }).catch(err => {
            alert(err.response.request._response);
            console.log(err.response.request._response);
        });
    }

    const ShowConfirmDeleteDialog = () => {
        return Alert.alert(
            "Are your sure you want to delete your account?",
            "Your account will be deleted and you will be redirected to the login page.",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: async () => {
                        deleteUser();
                        setShowDialog(false);
                        await AsyncStorage.removeItem('auth-token');
                        navigation.navigate('Login');
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    }

    //get and set user information from the user id
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
                <NameInput />
                <LocationInput />
                <BioInput />
                <PasswordInput />
                <ContactInput />

                {/* SAVE PROFILE CHANGES */}
                <Button
                    title='Save'
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
                        putUser();
                        navigation.navigate('UserProfile');
                    }}
                />

                {/* CANCEL EDIT BUTTON */}
                <Button
                    title='Cancel'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: 'grey',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 0,
                    }}
                    icon={
                        <Icon
                            name="cancel"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={() => { navigation.navigate('UserProfile') }}
                />

                <Divider width={1} style={{ marginVertical: 15 }} />

                {/* DELETE ACCOUNT BUTTON */}
                <Button
                    title='Delete Account'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginTop: 0
                    }}
                    icon={
                        <Icon
                            name="delete"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={() => ShowConfirmDeleteDialog()}
                />
            </Card>
        </View>
    );

    const getAuthToken = async () => {
        const token = await AsyncStorage.getItem("auth-token");
        console.log("localStorage token: ", token);
    }
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