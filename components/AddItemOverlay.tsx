import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Platform } from 'react-native';
import { Input, Overlay, Button, Icon, Text, Image } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import Item from './objects/Item';

const AddItemOverlay = ({ type, postItem, isVisible, onBackdropPressHandler }: any) => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        // console.log('useEffect running');
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        // console.log('imageUri (inside useEffect): ', imageUri);
    }, [imageUri]);

    let item = new Item();

    const itemTypes = [
        { label: 'Vegetable', value: '1' },
        { label: 'Fruit', value: '2' },
        { label: 'Nuts', value: '3' },
        { label: 'Meat', value: '4' },
        { label: 'Dairy', value: '5' },
        { label: 'Grains', value: '6' },
        { label: 'Baked Goods', value: '7' },
        { label: 'Plants', value: '8' },
        { label: 'Other', value: '9' },
    ];
    const unitTypes = [
        { label: 'lb', value: '1' },
        { label: 'kg', value: '2' },
        { label: 'g', value: '3' },
        { label: 'piece', value: '4' }
    ];



    const handleChoosePhoto = async () => {
        console.log('handleChoosePhoto running');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            // console.log('result.uri: ', result.uri);
            setImageUri(result.uri);
            item.setImage(result.uri);
            
            // const formData = new FormData();
            // formData.append('photo', result.uri);
        }
    };

    const PhotoUpload = () => {
        if (imageUri === '')
            return (
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            name='camera-retro'
                            type='font-awesome-5'
                            color='grey'
                            style={{ flex: 1, marginLeft: 10 }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                alignSelf: 'center',
                                // color: 'grey'
                            }}
                        >
                            Upload Image
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        else
            return (
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleChoosePhoto}>

                        <Image source={{ uri: imageUri }} style={styles.image} />
                        <Icon
                            name='check'
                            type='font-awesome-5'
                            color='green'
                            style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}
                        />
                        <Text style={{ marginLeft: 10, alignSelf: 'center', justifyContent: 'center' }}>Uploaded Image</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, margin: 0, padding: 0, justifyContent: 'center' }}>
                        <Icon
                            name='x'
                            type='feather'
                            color='grey'
                            style={{ flex: 1, alignSelf: 'flex-end' }}
                            onPress={() => {
                                setImageUri('');
                            }}
                        />
                    </View>
                </View>
            );


    }

    const OverlayContent = () => {
        if (type === 'product') {
            item.setItemType('product');
            return (
                <>
                    <ScrollView>

                        <View>

                            <Input placeholder="Product Name" onChangeText={(value) => item.setName(value)} />
                            {/* <Text style={styles.dropdownLabel}>Product Type</Text> */}
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={itemTypes}
                                labelField='label'
                                valueField='value'
                                value={item.type}
                                placeholder={'Select Product Type'}
                                onChange={value => item.setType(value.label)}
                            />
                            <Input placeholder='Description'
                                onChangeText={(value) => item.setDescription(value)}
                                style={{ marginTop: 15 }}
                                multiline={true}
                            />

                            <Input placeholder='City'
                                onChangeText={(value) => item.setCity(value)}
                                style={{ marginTop: 10 }}
                            />
                            <Input placeholder='Quantity'
                                onChangeText={(value) => item.setQuantity(value)}
                                style={{ marginTop: 10 }}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={unitTypes}
                                labelField='label'
                                valueField='value'
                                value={item.unitType}
                                placeholder={'Select Unit Type'}
                                onChange={value => item.setUnitType(value.label)}
                            />
                            <Input placeholder='Price'
                                onChangeText={(value) => item.setPrice(value)}
                                style={{ marginTop: 15 }}
                            />

                            <PhotoUpload />

                        </View>
                    </ScrollView>
                    <Button title='Add Product'
                        // color='black'
                        style={styles.addProductBtn}
                        onPress={() => {
                            postItem(item);
                        }}
                    />
                </>
            );
        } else if (type === 'job') {
            item.setItemType('job');
            return (
                <>
                    <ScrollView>

                        <View>

                            <Input placeholder="Job Title" onChangeText={(value) => item.setTitle(value)} />
                            {/* <Text style={styles.dropdownLabel}>Product Type</Text> */}
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getTypes()}
                                labelField='label'
                                valueField='value'
                                value={item.type}
                                placeholder={'Select Job Type'}
                                onChange={value => item.setType(value.label)}
                            />
                            <Input placeholder='Description'
                                onChangeText={(value) => item.setDescription(value)}
                                style={{ marginTop: 15 }}
                                multiline={true}
                            />

                            <Input placeholder='City'
                                onChangeText={(value) => item.setCity(value)}
                                style={{ marginTop: 10 }}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getUnitTypes()}
                                labelField='label'
                                valueField='value'
                                value={item.unitType}
                                placeholder={'Select Per Time Basis'}
                                onChange={value => item.setUnitType(value.label)}
                            />
                            <Input placeholder='Compensation'
                                onChangeText={(value) => item.setSalary(value)}
                                style={{ marginTop: 15 }}
                            />
                        </View>
                    </ScrollView>
                    <Button title='Add Job'
                        // color='black'
                        style={styles.addProductBtn}
                        onPress={() => {
                            postItem({
                                'title': item.title,
                                'type': item.type,
                                'description': item.description,
                                'salary': item.salary,
                                'unitType': item.unitType,
                                'city': item.city
                            });
                        }}
                    />
                </>
            );
        }
        // Equipment
        else {
            item.setItemType('equipment');
            return (
                <>
                    <ScrollView>

                        <View>


                            <Input placeholder="Equipment Title" onChangeText={(value) => item.setTitle(value)} />
                            {/* <Text style={styles.dropdownLabel}>Product Type</Text> */}
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getTypes()}
                                labelField='label'
                                valueField='value'
                                value={item.type}
                                placeholder={'Select Equipment Type'}
                                onChange={value => item.setType(value.label)}
                            />
                            <Input placeholder='Description'
                                onChangeText={(value) => item.setDescription(value)}
                                style={{ marginTop: 15 }}
                                multiline={true}
                            />

                            <Input placeholder='City'
                                onChangeText={(value) => item.setCity(value)}
                                style={{ marginTop: 10 }}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getUnitTypes()}
                                labelField='label'
                                valueField='value'
                                value={item.unitType}
                                placeholder={'Select Unit Type'}
                                onChange={value => item.setUnitType(value.label)}
                            />
                            <Input placeholder='Price'
                                onChangeText={(value) => item.setPrice(value)}
                                style={{ marginTop: 15 }}
                            />

                            <PhotoUpload />

                        </View>
                    </ScrollView>
                    <Button title='Add Equipment'
                        // color='black'
                        style={styles.addProductBtn}
                        onPress={() => {
                            // if ()
                            // const itemObj = {

                            // };
                            postItem({
                                'title': item.title,
                                'type': item.type,
                                'description': item.description,
                                'price': item.price,
                                'unitType': item.unitType,
                                'city': item.city,
                            }, imageUri);
                        }}
                    />
                </>
            );
        }
    }

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={() => {
                onBackdropPressHandler();
                setImageUri('');
            }}
            overlayStyle={styles.overlay}
        >
            <OverlayContent />
        </Overlay>
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
    dropdown: {
        height: 50,
        borderColor: 'white',
        borderBottomColor: 'black',
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        borderWidth: 0.5,
        borderRadius: 8,
        width: '95%',
        left: 10,
        bottom: 8
    },
    addProductBtn: {
        marginTop: 35
    },
    placeholder: {
        color: 'grey'
    },
    image: {
        flex: 1,
        marginLeft: 10,
        minWidth: 35,
        minHeight: 35,
    }
});

export default AddItemOverlay;