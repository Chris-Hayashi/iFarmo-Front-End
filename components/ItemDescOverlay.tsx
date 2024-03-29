import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Overlay, Text, Divider, Button, Icon } from 'react-native-elements';
import UpdateBtn from './UpdateBtn';
import DeleteBtn from './DeleteBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import AddItemOverlay from './AddItemOverlay';

const ItemDescOverlay = ({ item, itemImage, isVisible, hideOverlay, type, render }: any) => {

    const [addItemOverlayVisible, setAddItemOverlayVisible] = useState(false);
    const [userId, setUserId] = useState("");
    const [renderItemDesc, setRenderItemDesc] = useState(false);

    useEffect(() => {
        getUserId();
    }, []);

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
                setUserId(userId);
            }
        }
        catch (e) {
            console.log("damn it");
        }
        return await userId;
    }

    const isSameUser = async (postedUserId: string) => {
        const userId: string = await getUserId();
        return postedUserId === userId;
    }

    const EquipmentType = ({ type, style }: any) => {
        if (type === 'Tools')
            return <Text style={[style, { color: 'green', marginBottom: 5 }]}>Tools</Text>
        else if (type === 'Machinery')
            return <Text style={[style, { color: 'blue', marginBottom: 5 }]}>Machinery</Text>
        else if (type === 'Materials')
            return <Text style={[style, { color: 'red', marginBottom: 5 }]}>Materials</Text>
        else
            return <Text style={[style, { color: 'grey', marginBottom: 5 }]}>Other</Text>
    }

    const ItemDesc = () => {
        if (type === 'products')
            return (
                <View>
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
                        <Text style={styles.personName}>{item.postedBy.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text>Phone number: </Text>
                        <Text style={styles.personPhone}>{item.postedBy.contactInfo}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Email: </Text>
                        <Text
                            style={styles.personEmail}
                            onPress={() => sendEmail(item.postedBy.email)}
                        >
                            {item.postedBy.email}
                        </Text>
                    </View>
                </View>
            );
        else if (type === 'jobs')
            return (
                <View>
                    {item.postedBy.role === 'farmer'
                        ? <Text style={{ color: 'green', marginBottom: 0, fontWeight: 'bold', fontSize: 18 }}>Help Wanted</Text>
                        : <Text style={{ color: 'blue', marginBottom: 5, fontSize: 18 }}>Looking for a job</Text>
                    }
                    <Text style={styles.itemName}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                        <Text style={styles.itemType}>{item.type}</Text>
                        <Text style={styles.itemCity}>{item.city}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                        <Text style={styles.itemPrice}>${item.salary} / {item.unitType}</Text>
                        <Text style={styles.itemDatePosted}>{convertDate(item.datePosted)}</Text>
                    </View>

                    <Text style={styles.itemDesc}>{item.description}</Text>

                    <Divider color='black' style={styles.divider} />

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        {item.postedBy.role === 'farmer'
                            ? <Text>Employer Name: </Text>
                            : <Text>Worker Name: </Text>
                        }
                        <Text style={styles.personName}>{item.postedBy.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text>Phone Number: </Text>
                        <Text style={styles.personPhone}>{item.postedBy.contactInfo}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Email:</Text>
                        <Text
                            style={styles.personEmail}
                            onPress={() => sendEmail(item.postedBy.email)}
                        >
                            {item.postedBy.email}
                        </Text>
                    </View>

                </View>
            );
        else // EQUIPMENT
            return (
                <View>
                    <Image
                        source={item.imagePath ? { uri: item.imagePath } : itemImage}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemName}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                        <EquipmentType style={styles.itemType} type={item.type} />
                        <Text style={styles.itemCity}>{item.city}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                        <Text style={styles.itemPrice}>${item.price} / {item.unitType}</Text>
                        <Text style={styles.itemDatePosted}>{convertDate(item.datePosted)}</Text>
                    </View>

                    <Text style={styles.itemDesc}>{item.description}</Text>

                    <Divider color='black' style={styles.divider} />

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        {item.postedBy.role === 'farmer'
                            ? <Text>Employer Name: </Text>
                            : <Text>Worker Name: </Text>
                        }
                        <Text style={styles.personName}>{item.postedBy.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                        <Text>Phone Number: </Text>
                        <Text style={styles.personPhone}>{item.postedBy.contactInfo}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Email:</Text>
                        <Text
                            style={styles.personEmail}
                            onPress={() => sendEmail(item.postedBy.email)}
                        >
                            {item.postedBy.email}
                        </Text>
                    </View>

                </View>
            );
    }

    if (item == undefined)
        return (<View></View>);
    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={hideOverlay}
            overlayStyle={styles.overlay}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 20, minWidth: '95%' }}>
                    <ItemDesc />

                    {item.postedBy._id.toString() == userId ?
                        // {/* {await isSameUser(item.postedBy._id.toString) ? */}
                        <View>
                            <UpdateBtn 
                            item={item} 
                            itemType={type} 
                            renderHome={render}
                            renderItemDesc={() => setRenderItemDesc(!renderItemDesc)}
                            // toggleAddItemOverlay={() => setAddItemOverlayVisible(!addItemOverlayVisible)}
                            />

                            <DeleteBtn item={item} itemType={type} hideOverlay={hideOverlay} render={render} />
                        </View> : <View></View>}

                </View>
            </ScrollView>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        width: '80%',
        height: '60%',
        padding: 'auto',
        alignItems: 'center',
        // paddingHorizontal: 5,
        paddingVertical: 15,
        elevation: 0
    },
    divider: {
        marginVertical: 15
    },
    itemImage: {
        width: 300,
        height: 300,
        margin: 'auto',
        // marginLeft: 'auto',
        // marginRight: 'auto'
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
        // color: 'black',
        fontSize: 16,
        marginTop: 5
    },
    itemType: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18
    },
    personName: {
        flex: 1,
        textAlign: 'right',
    },
    personPhone: {
        flex: 1,
        textAlign: 'right'
    },
    personEmail: {
        flex: 1,
        textAlign: 'right'
    },
    updateBtn: {
        backgroundColor: '#1F802A',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 30,
    },
});

export default ItemDescOverlay;