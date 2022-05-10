import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Button, Icon, Dialog, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Item from './objects/Item';

const DeleteBtn = ({ item, itemType, hideOverlay, render }: { item: Item, itemType: string, hideOverlay: Function, render: Function }) => {
    const [dialogVisible, setDialogVisible] = useState(false);

    const deleteProduct = async () => {
        const token: any = await AsyncStorage.getItem('auth-token');

        await axios.delete(`https://nodejs-ifarmo.herokuapp.com/api/products/${item._id}`, {
            headers: {
                'auth-token': token
            }
        }).catch(err => console.log('err: ', err));
    };

    const deleteJob = async () => {
        const token: any = await AsyncStorage.getItem('auth-token');

        await axios.delete(`https://nodejs-ifarmo.herokuapp.com/api/jobs/${item._id}`, {
            headers: {
                'auth-token': token
            }
        }).catch(err => console.log(err));
    };

    const deleteEquipment = async () => {
        const token: any = await AsyncStorage.getItem('auth-token');

        await axios.delete(`https://nodejs-ifarmo.herokuapp.com/api/equipments/${item._id}`, {
            headers: {
                'auth-token': token
            }
        }).catch(err => console.log(err));
    };

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible)
    };

    const handleConfirmDelete = async () => {
        if (itemType === 'products')
            await deleteProduct();
        else if (itemType === 'jobs')
            await deleteJob();
        else
            await deleteEquipment();

        setDialogVisible(!dialogVisible);
        hideOverlay();
        render();
    };

    const ConfirmDeleteDialog = () => {
        return (
            <Dialog
                isVisible={dialogVisible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title={`Delete ${item.name || item.title}?`} />
                <Text>Are you sure you want to delete this post?</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Yes" onPress={handleConfirmDelete} />
                    <Dialog.Button title="No" onPress={() => {
                        setDialogVisible(!dialogVisible)
                        console.log('No Clicked!');
                    }} />
                </Dialog.Actions>
            </Dialog>
        )
    }

    return (
        <>
            <Button
                title='Delete'
                titleStyle={{ fontWeight: 'bold' }}
                buttonStyle={styles.deleteBtn}
                containerStyle={{ width: '100%', marginTop: 0 }}
                icon={
                    <Icon
                        name="delete"
                        color="#ffffff"
                        iconStyle={{ marginRight: 10 }}
                    />
                }
                onPress={toggleDialog}
            />
            <ConfirmDeleteDialog />
        </>
    )
}

const styles = StyleSheet.create({
    deleteBtn: {
        backgroundColor: '#ee3333',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 10,
    },
});

export default DeleteBtn;