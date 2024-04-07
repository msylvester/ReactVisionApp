/**
 * 
 * @author Mike </Ess>
 */


import React, { useState } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from 'react-native-image-picker';

const PictureCollection = () => {
    const [images, setImages] = useState([]);

    const handleImagePicker = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel) {
                setImages([...images, response.uri]);
            }
        });
    };

    const renderItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    return (
        <View style={styles.container}>
            {images?.length &&
                < FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3} // Adjust as needed
                />}
            <TouchableOpacity onPress={handleImagePicker} style={styles.addButton}>
                {/* You can put an add button icon or text here */}
                <Text>Add Image</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    addButton: {
        width: 100,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
});

export default PictureCollection;
