import React from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import DefaultImage from '../img/addProject.png';


const ImageCollection = ({ images }) => {

    const renderItem = ({ item, index }) => {

        // For the first item, wrap it with TouchableOpacity to make it clickable
        return (
            <TouchableOpacity onPress={() => handleImageClick(item)}>
                <Image source={item.source} style={styles.image} />
                {console.log(`here is the label ${item.label}`)}
                <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
        );

    };

    // Function to handle click on the first image
    const handleImageClick = (item) => {
        // Add your logic here to handle click on the first image
        console.log('Clicked on the first image:', item);
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={false} // Set to true if you want horizontal scrolling
                numColumns={2} // Set the number of columns for grid layout
                contentContainerStyle={styles.list} // Optional, for additional styling
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    label: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ImageCollection;
