import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Overlay, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { View } from '../components/Themed';

const AddItemOverlay = ({ postItem, isVisible, onBackdropPressHandler }: any) => {
    const [overlayVisible, setOverlayVisible] = useState(false);

    let itemObj = {
        'name': '',
        'type': '',
        'description': '',
        'quantity': '',
        'unitType': '',
        'price': ''
    };
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
    ]

    return (
        <View>
            <Overlay
                isVisible={isVisible}
                onBackdropPress={onBackdropPressHandler}
                overlayStyle={styles.overlay}
            >
                {/* Add Item Form */}

                <Input placeholder="Product Name" onChangeText={(value) => itemObj.name = value} />
                {/* <Text style={styles.dropdownLabel}>Product Type</Text> */}
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholder}
                    data={itemTypes}
                    labelField='label'
                    valueField='value'
                    value={itemObj.type}
                    placeholder={'Select Product Type'}
                    onChange={item => {
                        itemObj.type = item.label;
                    }}
                />
                <Input placeholder='Description'
                    onChangeText={(value) => itemObj.description = value}
                    style={{ marginTop: 15 }}
                />
                <Input placeholder='Quantity'
                    onChangeText={(value) => itemObj.quantity = value}
                    style={{ marginTop: 10 }}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholder}
                    data={unitTypes}
                    labelField='label'
                    valueField='value'
                    value={itemObj.unitType}
                    placeholder={'Select Unit Type'}
                    onChange={item => {
                        itemObj.unitType = item.label;
                    }}
                />
                <Input placeholder='Price'
                    onChangeText={(value) => itemObj.price = value}
                    style={{ marginTop: 15 }} />

                <Button title='Add Product'
                    // color='black'
                    style={styles.addProductBtn}
                    onPress={() => {
                        postItem(itemObj);
                    }}
                />

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
});

export default AddItemOverlay;