import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Card, FAB, Input, Overlay, Button, Text, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import SearchBar from 'react-native-platform-searchbar';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import { addEventListener } from 'expo-linking';

const ItemDescOverlay = ({ item, itemImage, isVisible, onBackdropPressHandler }: any) => {

    if (item == undefined)
        return (<View></View>);
    return (
        <View>
            <Overlay
                isVisible={isVisible}
                onBackdropPress={onBackdropPressHandler}
                overlayStyle={styles.overlay}
            >
                <Text h2={true} style={styles.itemName}>{item.name}</Text>
                <Image
                    source={itemImage}
                    style={styles.itemImage}
                />

                <Text h4={true} style={styles.itemMargin}>Description</Text>
                <Text>{item.description}</Text>
                <Text style={styles.itemMargin}>Quantity: {item.quantity}</Text>
                <Text>${item.price} / {item.unitType}</Text>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        width: '80%',
        height: '60%',
        maxWidth: 500,
        maxHeight: 600,
        padding: 25,
        elevation: 0
    },
    itemName: {
        textAlign: 'center'
    },
    itemMargin: {
        marginTop: 25,
        marginBottom: 10
    },
    itemImage: {
        maxWidth: 200,
        maxHeight: 200,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

export default ItemDescOverlay;