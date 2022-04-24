import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Overlay, Text, Divider, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const ItemDescOverlay = ({ item, itemImage, isVisible, onBackdropPressHandler }: any) => {
    
    // const [userId, setUserId] = useState("");
    
    // useEffect(() => {

    // }, [userId]);
    
    const convertDate = (date: any) => {
        const dateObj = new Date(date);
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }

    const sendEmail = async (email: string) => {
        await Linking.openURL(`mailto:${email}`)
            .catch(err => console.log(err));
    }

    const getUserId = async () => {
        var userId = ""
        try {
            const token = await AsyncStorage.getItem('auth-token');
            if (token != null) {
                var decoded_token: { _id: string } = jwt_decode(token);
                userId = decoded_token._id;
            }
            console.log("userId: ", userId);
            // setUserId(userId);
        }
        catch (e) {
            console.log("damn it");
        }
        return userId;
    }


    if (item == undefined)
        return (<View></View>);
    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onBackdropPressHandler}
            overlayStyle={styles.overlay}
        >
            <ScrollView>
                <View style={{ width: '100%', height: '100%', maxWidth: 300, maxHeight: 500, marginBottom: '75%' }}>

                    <Image
                        source={item.imagePath ? { uri: item.imagePath } : itemImage}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemName}>{item.name}</Text>

                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                        <Text style={styles.itemPrice}>${item.price} / {item.unitType}</Text>
                        <Text style={styles.itemCity}>{item.city}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                        <Text style={styles.itemDatePosted}>{convertDate(item.datePosted)}</Text>
                    </View>
                    <Text style={styles.itemDesc}>{item.description}</Text>

                    <Divider color={'black'} style={styles.divider} />

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text>Seller name: </Text>
                        <Text style={styles.sellerName}>{item.postedBy.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text>Phone number: </Text>
                        <Text style={styles.sellerPhone}>{item.postedBy.contactInfo}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Email: </Text>
                        <Text
                            style={styles.sellerEmail}
                            onPress={() => sendEmail(item.postedBy.email)}
                        >
                            {item.postedBy.email}
                        </Text>
                    </View>

                    {item.postedBy._id.toString() === getUserId().toString() ? <View>
                    <Button
                        title='Update'
                        titleStyle={{ fontWeight: 'bold' }}
                        buttonStyle={{
                            backgroundColor: '#00b894',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 10,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginTop: 20,
                        }}
                        containerStyle={{
                            width: '100%',
                            // marginVertical: 20,
                            marginTop: 0
                        }}
                        icon={
                            <Icon
                                name="edit"
                                color="#ffffff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        // onPress={() => ShowConfirmDeleteDialog()}
                    />

                    <Button
                        title='Delete'
                        titleStyle={{ fontWeight: 'bold' }}
                        buttonStyle={{
                            backgroundColor: '#ee3333',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 10,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginTop: 20,
                        }}
                        containerStyle={{
                            width: '100%',
                            marginTop: 0
                        }}
                        icon={
                            <Icon
                                name="delete"
                                color="#ffffff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        // onPress={() => ShowConfirmDeleteDialog()}
                    /> 
                    </View> : <View></View>}
                    
                </View>

            </ScrollView>
            {/* </View> */}
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '80%',
        height: '60%',
        // maxWidth: 500,
        // maxHeight: 600,
        padding: 22,
        // paddingRight: 5,
        elevation: 0
    },
    divider: {
        marginVertical: 15
    },
    itemImage: {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        maxHeight: 300,
        margin: 0,
        // marginTop: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        textAlign: 'left'
    },
    itemPrice: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18
    },
    itemCity: {
        flex: 1,
        textAlign: 'right',
        color: 'grey'
    },
    itemQty: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemDatePosted: {
        flex: 1,
        textAlign: 'right'
    },
    itemDesc: {
        fontSize: 14,
        marginTop: 5
    },
    sellerName: {
        flex: 1,
        textAlign: 'right',
    },
    sellerPhone: {
        flex: 1,
        textAlign: 'right'
    },
    sellerEmail: {
        flex: 1,
        textAlign: 'right'
    }
});

export default ItemDescOverlay;