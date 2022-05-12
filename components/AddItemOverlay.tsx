import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Platform } from 'react-native';
import { Input, Overlay, Button, Icon, Text, Image } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import PhotoUpload from './PhotoUpload';
import Item from './objects/Item';

const AddItemOverlay = ({ type, postItem, updateItem, isVisible, onBackdropPressHandler, backdropStyle, isEdit, itemObj }: any) => {
    const [overlayVisible, setOverlayVisible] = useState(false);

    useEffect(() => {
        // console.log('itemObj: ', itemObj);
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    let item: Item;
    if (isEdit)
        item = new Item(itemObj, type);
    else
        item = new Item(type);

    const unitTypes = [
        { label: 'lb', value: '1' },
        { label: 'kg', value: '2' },
        { label: 'g', value: '3' },
        { label: 'piece', value: '4' }
    ];

    const getSelectedType = () => {
        let label = item.type;
        if (type === 'equipments') {
            if (label === 'Tools')
                label = 'Tool';
            else if (label === 'Materials')
                label = 'Material';
        }

        if (type === 'jobs') {
            // console
            label = item.type;
            if (label === 'full-time')
                label = 'Full-time';
            else if (label === 'part-time')
                label = 'Part-time';
            else if (label === 'temporary')
                label = 'Temporary';
            else if (label === 'any')
                label = 'Any';

        }

        for (let i = 0; i < item.getTypes().length; i++)
            if (item.getTypes()[i].label === label)
                return item.getTypes()[i].value;
    };

    const getSelectedUnitType = () => {

        let label = item.unitType;

        if (type === 'jobs') {
            if (label === 'one-time')
                label = 'One-time';
            else if (label === 'hour')
                label = 'Hourly'
            else if (label === 'day')
                label = 'Daily';
            else if (label === 'week')
                label = 'Weekly';
            else if (label === 'month')
                label = 'Monthly';
        }



        for (let i = 0; i < item.getUnitTypes().length; i++)
            if (item.getUnitTypes()[i].label === label)
                return item.getUnitTypes()[i].value;

    };

    const OverlayContent = () => {
        if (type === 'products') {
            // item.setItemType('product');
            return (
                <>
                    <ScrollView>
                        <View>
                            <Input
                                placeholder="Product Name"
                                defaultValue={item.name}
                                onChangeText={(value) => item.setName(value)}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getTypes()}
                                labelField='label'
                                valueField='value'
                                value={getSelectedType()}
                                placeholder={'Select Product Type'}
                                onChange={value => item.setType(value.label)}
                            />
                            <Input placeholder='Description'
                                defaultValue={item.description}
                                onChangeText={(value) => item.setDescription(value)}
                                style={{ marginTop: 15 }}
                                multiline={true}
                            />

                            <Input placeholder='City'
                                defaultValue={item.city}
                                onChangeText={(value) => item.setCity(value)}
                                style={{ marginTop: 15 }}
                            />
                            <Input placeholder='Quantity'
                                defaultValue={JSON.stringify(item.quantity)}
                                onChangeText={(value) => item.setQuantity(value)}
                                style={{ marginTop: 10 }}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={unitTypes}
                                labelField='label'
                                valueField='value'
                                value={getSelectedUnitType()}
                                placeholder={'Select Unit Type'}
                                onChange={value => item.setUnitType(value.label)}
                            />
                            <Input placeholder='Price'
                                defaultValue={JSON.stringify(item.price)}
                                onChangeText={(value) => item.setPrice(value)}
                                style={{ marginTop: 15 }}
                            />

                            <PhotoUpload item={item} />

                        </View>
                    </ScrollView>
                    {isEdit
                        ? <Button title='Update Product'
                            // color='black'
                            style={styles.addProductBtn}
                            // onPress={() => console.log('item: ', item)}
                            onPress={async () => {
                                await updateItem({
                                    'name': item.name,
                                    'type': item.type,
                                    'description': item.description,
                                    'price': item.price,
                                    'quantity': item.quantity,
                                    'unitType': item.unitType,
                                    'city': item.city
                                }, item.imagePath);
                            }}
                        />
                        : <Button title='Add Product'
                            // color='black'
                            style={styles.addProductBtn}
                            // onPress={() => console.log('item: ', item)}
                            onPress={async () => {
                                await postItem({
                                    'name': item.name,
                                    'type': item.type,
                                    'description': item.description,
                                    'price': item.price,
                                    'quantity': item.quantity,
                                    'unitType': item.unitType,
                                    'city': item.city
                                }, item.imagePath);
                            }}
                        />
                    }
                </>
            );
        } else if (type === 'jobs') {
            // item.setItemType('job');
            return (
                <>
                    <ScrollView>

                        <View>
                            <Input
                                placeholder="Job Title"
                                defaultValue={item.title}
                                onChangeText={(value) => item.setTitle(value)}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getTypes()}
                                labelField='label'
                                valueField='value'
                                value={getSelectedType()}
                                placeholder={'Select Job Type'}
                                onChange={value => item.setType(value.label)}
                            />
                            <Input
                                placeholder='Description'
                                defaultValue={item.description}
                                onChangeText={(value) => item.setDescription(value)}
                                style={{ marginTop: 15 }}
                                multiline={true}
                            />

                            <Input
                                placeholder='City'
                                defaultValue={item.city}
                                onChangeText={(value) => item.setCity(value)}
                                style={{ marginTop: 0 }}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                data={item.getUnitTypes()}
                                labelField='label'
                                valueField='value'
                                value={getSelectedUnitType()}
                                placeholder={'Select Per Time Basis'}
                                onChange={value => item.setUnitType(value.label)}
                            />
                            <Input
                                placeholder='Compensation'
                                defaultValue={JSON.stringify(item.salary)}
                                onChangeText={(value) => item.setSalary(value)}
                                style={{ marginTop: 15 }}
                            />
                        </View>
                    </ScrollView>
                    {isEdit
                        ? <Button title='Update Job'
                            // color='black'
                            style={styles.addProductBtn}
                            onPress={async () => {
                                await updateItem({
                                    'title': item.title,
                                    'type': item.type,
                                    'description': item.description,
                                    'salary': item.salary,
                                    'unitType': item.unitType,
                                    'city': item.city
                                });
                            }}
                        />
                        : <Button title='Add Job'
                            // color='black'
                            buttonStyle={styles.addProductBtn}
                            onPress={async () => {
                                await postItem({
                                    'title': item.title,
                                    'type': item.type,
                                    'description': item.description,
                                    'salary': item.salary,
                                    'unitType': item.unitType,
                                    'city': item.city
                                });
                            }}
                        />
                    }
                </>
            );
        }

        // Equipment
        else {
            // item.setItemType('equipment');
            return (
                <>
                    <ScrollView>

                        <View>


                            {useMemo(() => {

                                return (
                                    <>

                                        <Input
                                            placeholder="Equipment Title"
                                            defaultValue={item.title}
                                            onChangeText={(value) => item.setTitle(value)}
                                        />
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholder}
                                            data={item.getTypes()}
                                            labelField='label'
                                            valueField='value'
                                            value={getSelectedType()}
                                            placeholder={'Select Equipment Type'}
                                            onChange={value => item.setType(value.label)}
                                        />
                                        <Input placeholder='Description'
                                            defaultValue={item.description}
                                            onChangeText={(value) => item.setDescription(value)}
                                            style={{ marginTop: 15 }}
                                            multiline={true}
                                        />

                                        <Input placeholder='City'
                                            defaultValue={item.city}
                                            onChangeText={(value) => item.setCity(value)}
                                            style={{ marginTop: 10 }}
                                        />
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholder}
                                            data={item.getUnitTypes()}
                                            labelField='label'
                                            valueField='value'
                                            value={getSelectedUnitType()}
                                            placeholder={'Select Unit Type'}
                                            onChange={value => item.setUnitType(value.label)}
                                        />
                                        <Input placeholder='Price'
                                            defaultValue={JSON.stringify(item.price)}
                                            onChangeText={(value) => item.setPrice(value)}
                                            style={{ marginTop: 15 }}
                                        />
                                    </>
                                );
                            }, [])}

                            <PhotoUpload item={item} />

                        </View>
                    </ScrollView>

                    {isEdit
                        ? <Button title='Update Equipment'
                            // color='black'
                            style={styles.addProductBtn}
                            onPress={async () => {
                                await updateItem({
                                    'title': item.title,
                                    'type': item.type,
                                    'description': item.description,
                                    'price': item.price,
                                    'unitType': item.unitType,
                                    'city': item.city,
                                }, item.imagePath);
                            }}
                        />

                        : <Button title='Add Equipment'
                            // color='black'
                            style={styles.addProductBtn}
                            onPress={async () => {
                                await postItem({
                                    'title': item.title,
                                    'type': item.type,
                                    'description': item.description,
                                    'price': item.price,
                                    'unitType': item.unitType,
                                    'city': item.city,
                                }, item.imagePath);
                            }}
                        />
                    }
                </>
            );
        }
    };

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={() => {
                onBackdropPressHandler();
                setOverlayVisible(!overlayVisible);
            }}
            backdropStyle={backdropStyle}
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
        backgroundColor: '#0086E3',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 0,
        width: 150,
        alignSelf: 'center'
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