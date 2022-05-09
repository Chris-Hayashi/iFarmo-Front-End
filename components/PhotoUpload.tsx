import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Item from './objects/Item';

const PhotoUpload = ({ item }: { item: Item }) => {
    const [render, setRender] = useState(false);

    const handleChoosePhoto = async () => {
        console.log('handleChoosePhoto running');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 800, width: 800 } }], {})
                .then(res => {
                    item.setImage(res.uri);
                    setRender(!render);
                })
                .catch(err => console.log(err));
        }
    };

    if (item.image === undefined)
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

                    <Image source={{ uri: item.image }} style={styles.image} />
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
                            item.setImage(undefined);
                            setRender(!render);
                        }}
                    />
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        marginLeft: 10,
        minWidth: 35,
        minHeight: 35,
    }
});

export default PhotoUpload