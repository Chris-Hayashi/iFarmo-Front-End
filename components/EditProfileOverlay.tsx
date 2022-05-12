import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Overlay, Button, Icon, Text, Image } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import User from './objects/User';



const EditProfileOverlay = ({ name, email, contactInfo, role, bio, isVisible, onBackdropPressHandler, renderUserProfile }:
    { name: string, email: string, contactInfo: string, role: string, bio: string, 
        isVisible: boolean, onBackdropPressHandler: any, renderUserProfile: Function }) => {
    // const [overlayVisible, setOverlayVisible] = useState(false);
    // const [selectedRole, setSelectedRole] = useState(role.charAt(0).toUpperCase() + role.slice(1));


    // useEffect(() => {
    //     console.log('selectedRole: ', selectedRole);
    // }, [])
    let user: User = new User({
        name: name,
        email: email,
        contactInfo: contactInfo,
        bio: bio,
        role: role
    });

    const updateProfile = async () => {
        let token: any = await AsyncStorage.getItem("auth-token");

        // let userObj = new User();
        console.log('user: ', user);

        await axios.put('https://nodejs-ifarmo.herokuapp.com/api/users/', user, {
            headers: {
                'auth-token': token
            }
        })
            .catch(err => console.log(err));
    };

    const getDropdownValue = () => {
        if (user.role === 'user')
            return '1';
        else if (user.role === 'worker')
            return '2';
        else
            return '3';
    }

    const OverlayContent = () => {
        return (
            <>
                <ScrollView>
                    <View>
                        <Input
                            placeholder='Enter your name'
                            placeholderTextColor={'grey'}
                            label='Name'
                            defaultValue={user.name}
                            onChangeText={(value) => user.setName(value)}
                        />
                        <Input
                            placeholder='Enter your email'
                            placeholderTextColor={'grey'}
                            label='Email'
                            defaultValue={user.email}
                            disabled={true}
                            onChangeText={(value) => user.setEmail(value)}
                        />
                        <Input
                            placeholder='Enter your phone'
                            placeholderTextColor={'grey'}

                            label='Phone'
                            defaultValue={user.contactInfo}
                            onChangeText={(value) => user.setContactInfo(value)}
                        />
                        <Input
                            placeholder='Bio'
                            placeholderTextColor={'grey'}
                            label='Enter your bio'
                            defaultValue={user.bio}
                            multiline={true}
                            onChangeText={(value) => user.setBio(value)}
                        />

                        <Text style={styles.label}>
                            Role
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholder}
                            data={[
                                { label: 'User', value: '1' },
                                { label: 'Worker', value: '2'},
                                { label: 'Farmer', value: '3' },
                            ]}
                            labelField='label'
                            valueField='value'
                            value={getDropdownValue()}
                            placeholder={'Select your role'}
                            onChange={value => {
                                console.log('selected value: ', value.label);
                                user.setRole(value.label.charAt(0).toLowerCase() + value.label.slice(1));
                                // setSelectedRole(value.label);
                            }}
                        />
                    </View>
                </ScrollView>

                <Button
                    title='Save'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={styles.saveBtn}
                    // containerStyle={{ width: '50%', marginTop: 0 }}
                    icon={
                        <Icon
                            name="save"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    onPress={async() => {
                        await updateProfile();
                        onBackdropPressHandler();
                        renderUserProfile();
                    }}
                />
            </>
        );
    };


    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onBackdropPressHandler}
            // backdropStyle={backdropStyle}
            overlayStyle={styles.overlay}
        >
            <OverlayContent />
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        width: '80%',
        height: '60%',
        maxWidth: 500,
        maxHeight: 600,
        padding: 25,
        elevation: 0
    },
    dropdown: {
        height: 50,
        borderColor: 'white',
        borderBottomColor: 'black',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 0.5,
        borderRadius: 8,
        width: '95%',
        left: 10,
        bottom: 8
    },
    placeholder: {
        color: 'grey'
    },
    label: {
        marginLeft: 10,
        marginBottom: 3,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#86939D'
    },
    saveBtn: {
        backgroundColor: '#0086E3',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 0,
        width: 150,
        alignSelf: 'center'
        // paddingHorizontal: 10
    }
})

export default EditProfileOverlay;