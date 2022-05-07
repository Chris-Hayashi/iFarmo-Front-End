import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Overlay, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { View } from '../components/Themed';
import Item from './objects/Item';

const AddItemOverlay = ({ type, postItem, isVisible, onBackdropPressHandler }: any) => {
    const [overlayVisible, setOverlayVisible] = useState(false);

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
                                style={{ marginTop: 15 }} />


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
                                style={{ marginTop: 15 }} />


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
                                style={{ marginTop: 15 }} />


                        </View>
                    </ScrollView>
                    <Button title='Add Equipment'
                        // color='black'
                        style={styles.addProductBtn}
                        onPress={() => {
                            postItem({
                                'title': item.title,
                                'type': item.type,
                                'description': item.description,
                                'price': item.price,
                                'unitType': item.unitType,
                                'city': item.city
                            });
                        }}
                    />
                </>
            );
        }
    }

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onBackdropPressHandler}
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
});

export default AddItemOverlay;