// SetsScreen.js

import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';

const SetsScreen = ({ route }) => {
    const { images } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        alignItems: 'center', // Center items in the scroll view
        paddingVertical: 20,
    },
    imageContainer: {
        marginBottom: 15,
        width: '90%', // Ensure images take up most of the width of the screen
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default SetsScreen;
