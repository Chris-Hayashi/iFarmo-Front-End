import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
// import { View } from '../components/Themed';
import ItemDescOverlay from './ItemDescOverlay';

const Grid = ({ items, type }: any) => {
    const [itemIndex, setItemIndex] = useState(0);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const convertDate = (date: any) => {
        const dateObj = new Date(date);
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }

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

    const CardContent = ({ item }: any) => {
        if (type === 'products')
            return (
                <View>
                    <Card.Image
                        style={styles.image}
                        source={
                            item.imagePath ? { uri: item.imagePath } : getItemImage(item.type)
                        }
                    />
                    <Card.Title style={[styles.itemName]}>{item.name}</Card.Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.itemPrice]}>${item.price} / {item.unitType}</Text>
                        <Text style={[styles.itemCity]}>{item.city}</Text>
                    </View>
                </View>
            );
        else if (type === 'jobs')
            return (
                <View>
                    {item.postedBy.role === 'farmer'
                        ? <Text style={{ color: 'green', marginBottom: 5 }}>Help Wanted</Text>
                        : <Text style={{ color: 'blue', marginBottom: 5 }}>Looking for a job</Text>
                    }
                    <Card.Title style={[styles.jobTitle]}>{item.title}</Card.Title>
                    <Card.Divider color='black' />

                    <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', }}>
                        <Text style={styles.jobType}>{item.type}</Text>
                        <Text style={[styles.itemCity]}>{item.city}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {item.salary !== 0
                           ? <Text style={[styles.jobSalary]}>${item.salary} / {item.unitType}</Text>
                           : <View />}
                        <Text style={styles.datePosted}>{convertDate(item.datePosted)}</Text>
                    </View>

                    <Text style={styles.jobDesc}>{item.description}</Text>
                </View>
            );
        else // EQUIPMENT
            return <View></View>;
    }

    return (

        <View style={styles.grid}>
            <FlatList
                // horizontal={true}
                data={items}
                renderItem={({ item, index }) => (
                    <Card containerStyle={styles.card}>
                        <ItemDescOverlay
                            item={items[itemIndex]}
                            itemImage={getItemImage(items[itemIndex].type)}
                            isVisible={overlayVisible}
                            onBackdropPressHandler={() => setOverlayVisible(!overlayVisible)}
                            type={type}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setOverlayVisible(!overlayVisible)
                                setItemIndex(index);
                            }}
                        >
                            <CardContent item={item} />
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
        flex: 1,
        flexDirection: "row",
        paddingTop: 0,
        marginTop: 0
    },
    card: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10
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
        marginTop: 15,
        lineHeight: 14,
    },
    itemPrice: {
        flex: 1,
        textAlign: 'left',
        padding: 0,
        lineHeight: 14
    },
    itemCity: {
        flex: 1,
        textAlign: 'right',
        justifyContent: 'center',
        color: 'grey'
    },
    jobTitle: {
        textAlign: 'left',
        fontSize: 18
    },
    jobType: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        justifyContent: 'center'
    },
    jobSalary: {
        flex: 1,
        fontWeight: 'bold',
    },
    jobDesc: {
        marginTop: 10
    },
    datePosted: {
        flex: 1,
        textAlign: 'right'
    }
});

export default Grid;