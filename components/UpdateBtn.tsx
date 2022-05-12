import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Overlay, Text, Divider, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import AddItemOverlay from '../components/AddItemOverlay'
import Item from './objects/Item';

const UpdateBtn = ({ item, itemType, renderHome, renderItemDesc }:
    { item: Item, itemType: string, renderHome: Function, renderItemDesc: Function }) => {
    const [addItemOverlayVisible, setAddItemOverlayVisible] = useState(false);

    // useEffect(() => console.log('item id: ', item._id), []);

    const toggleAddItemOverlay = () => {
        setAddItemOverlayVisible(!addItemOverlayVisible);
    }

    const updateProduct = async (product: Record<string, string>, imageUri: string) => {
        console.log('updateProduct executing...');
        const token: any = await AsyncStorage.getItem('auth-token');

        if (imageUri !== undefined && imageUri !== '') {
            console.log('uploadAsync will execute...');
            let options = {
                headers: {
                    'auth-token': token
                },
                fieldName: 'image',
                mimeType: 'image/jpeg',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: product
            };
            await FileSystem.uploadAsync('https://nodejs-ifarmo.herokuapp.com/api/products/', imageUri, options)
                .then(res => {
                    console.log(res);
                    renderItemDesc();
                    toggleAddItemOverlay();
                    renderHome();
                })
                .catch(err => {
                    alert(err.response.request._response);
                    console.log(err.response.request._response);
                });
        }

        else {
            console.log('axios will execute...');
            await axios.put(`https://nodejs-ifarmo.herokuapp.com/api/products/${item._id}`, product, {
                headers: {
                    'auth-token': token
                }
            }).then(res => {
                console.log(res);
                renderItemDesc();
                toggleAddItemOverlay();
                renderHome();
                //   setOverlayVisible(false);
                //   setRender(!render);
            }).catch(err => {
                alert(err.response.request._response);
                console.log(err.response.request._response);
            });
        }
    };

    const updateJob = async (job: any) => {
        console.log('updateJob executing...');
        let token: any = await AsyncStorage.getItem("auth-token");
        console.log("token: ", JSON.stringify(token));

        await axios.put(`https://nodejs-ifarmo.herokuapp.com/api/jobs/${item._id}`, job, {
            headers: {
                'auth-token': token
            }
        }).then(res => {
            console.log("postJob() res: ", res);
            renderItemDesc();
            toggleAddItemOverlay();
            renderHome();
        }).catch(err => {
            alert(err.response.request._response);
            console.log(err.response.request._response);
        });
    };

    const updateEquipment = async (equipment: any, imageUri: any) => {
        console.log('updateEquipment Executing');
        const token: any = await AsyncStorage.getItem('auth-token');

        if (imageUri !== undefined && imageUri !== '') {
            console.log('uploadAsync will execute...');
            let options = {
                headers: {
                    'auth-token': token
                },
                fieldName: 'image',
                mimeType: 'image/jpeg',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: equipment
            };
            await FileSystem.uploadAsync('https://nodejs-ifarmo.herokuapp.com/api/equipments/', imageUri, options)
                .then(res => {
                    console.log(res);
                    renderItemDesc();
                    toggleAddItemOverlay();
                    renderHome();
                })
                .catch(err => {
                    alert(err.response.request._response);
                    console.log(err.response.request._response);
                });
        }

        else {
            console.log('axios will execute...');
            await axios.put(`https://nodejs-ifarmo.herokuapp.com/api/equipments/${item._id}`, equipment, {
                headers: {
                    'auth-token': token
                }
            }).then(res => {
                console.log(res);
                renderItemDesc();
                toggleAddItemOverlay();
                renderHome();
            }).catch(err => {
                alert(err.response.request._response);
                console.log(err.response.request._response);
            });
        }
    };

    const handleUpdateItem = async (item: any, imageUri: any) => {
        if (itemType === 'products')
            await updateProduct(item, imageUri);
        else if (itemType === 'jobs')
            await updateJob(item);
        else
            await updateEquipment(item, imageUri);
    }

    return (
        <>
            <Button
                title='Update'
                titleStyle={{ fontWeight: 'bold' }}
                buttonStyle={styles.updateBtn}
                containerStyle={{ width: '100%', marginTop: 0 }}
                icon={
                    <Icon
                        name="edit"
                        color="#ffffff"
                        iconStyle={{ marginRight: 10 }}
                    />
                }
                onPress={toggleAddItemOverlay}
            />

            {/* CREATe EditItemOverlay.tsx */}


            <AddItemOverlay
                isVisible={addItemOverlayVisible}
                // postItem={postProduct}
                updateItem={handleUpdateItem}
                updateItemObj={item}
                onBackdropPressHandler={toggleAddItemOverlay}
                backdropStyle={{ opacity: 0 }}
                type={itemType}
                isEdit={true}
                itemObj={item}
            />
        </>
    );
}

const styles = StyleSheet.create({
    updateBtn: {
        backgroundColor: '#1F802A',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 30,
    }
});
export default UpdateBtn;