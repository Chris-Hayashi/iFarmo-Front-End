import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
// import { View } from '../components/Themed';
import ItemDescOverlay from './ItemDescOverlay';

const Grid = ({ items }: any) => {
    const [itemIndex, setItemIndex] = useState(0);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const getItemImage = (type: string) => {
        switch (type) {
            case 'Vegetable':
                return require('../assets/images/vegetables.png');
            case 'Fruit':
                return require('../assets/images/fruits.png');
            case 'Nuts':
                return require('../assets/images/nuts.png');
            case 'Meat':
                return require('../assets/images/meat.png');
            case 'Dairy':
                return require('../assets/images/dairy.png');
            case 'Grains':
                return require('../assets/images/grains.png');
            case 'Baked Goods':
                return require('../assets/images/baked_goods.png');
            case 'Plants':
                return require('../assets/images/plants.png');
            case 'Other':
                return require('../assets/images/other.png');
            default:
                return require('../assets/images/other.png');
        }
    }

    return (
        <View style={styles.grid}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <Card containerStyle={styles.card}>
                        <ItemDescOverlay
                            item={items[itemIndex]}
                            itemImage={getItemImage(items[itemIndex].type)}
                            isVisible={overlayVisible}
                            onBackdropPressHandler={() => setOverlayVisible(!overlayVisible)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setOverlayVisible(!overlayVisible)
                                setItemIndex(index);
                            }}
                        >
                            <Card.Image
                                style={styles.image}
                                source={
                                    item.imagePath ? { uri: item.imagePath } : getItemImage(item.type)
                                }
                            />
                            <Card.Divider />

                            <Card.Title style={[styles.itemName]}>{item.name}</Card.Title>
                            <Text style={[styles.itemPrice]}>${item.price} / {item.unitType}</Text>
                            <Text style={[styles.itemCity]}>{item.city}</Text>
                        </TouchableOpacity>
                    </Card>
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        paddingTop: 0,
    },
    card: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        // justifyContent: 'center'
    },
    image: {
        borderRadius: 10,
        padding: 0,
        margin: 0,
    },
    itemName: {
        textAlign: 'left',
        padding: 0,
        lineHeight: 14,
    },
    itemPrice: {
        textAlign: 'left',
        padding: 0,
        lineHeight: 14
    },
    itemCity: {
        textAlign: 'right',
        color: 'grey'
    },
    overlay: {
        width: '80%',
        height: '60%',
        maxWidth: 500,
        maxHeight: 600,
        padding: 25,
        elevation: 0
    }
});

export default Grid;