import { useState, version } from 'react';
import { StyleSheet, FlatList, Animated, View, Text, Image } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements';
import React from 'react';

const NameText = () => {
    return (<Text style = {styles.row}>Name:</Text>);
}

const OccupationText = () => { 
    return (<Text style = {styles.row}>Occupation:</Text>);
}

const LocationText = () =>  {
    return (<Text style = {styles.row}>Location:</Text>);
}

const getUser = () => {
    
}
axios.get('https://nodejs-ifarmo.herokuapp.com/api/user/:id/', userObj)
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
        });tmp = {

}
const UserProfile = () => {
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
                    <NameText/>
                    <Text>{}</Text>
                    <OccupationText />
                    <LocationText />
                    <Button
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

export default UserProfile;