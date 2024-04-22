import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setImageRedux, updateBlocks } from '../store'; // Import your action creator

// Import images statically
import redImage from '../img/red_2x2.png';
import blueImage from '../img/blue_2x2.png';
import blackImage from '../img/black_2x2.png';
import greenImage from '../img/green_2x2.png';
import greyImage from '../img/grey_2x2.png';
import { useNavigation } from '@react-navigation/native';
import { imageFilenames, imagePaths } from '../filenameConsants';
const LeggoScreen = (props) => {
    // Specify image filenames manually
    const { params: { uid, projectName } } = props.route
    const navigation = useNavigation();

    const dispatch = useDispatch()
    const project = useSelector((state) => state.user.project)
    // Construct image paths from imported images
    console.log(`te rpoject in leggo screen is ${JSON.stringify(project)}`)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageSelect = (filename: string) => {
        // Handle selection of the image
        console.log('Selected image:', filename);
        setSelectedImage(filename);

    };



    const handlePickSelectedBlock = async () => {
        // Handle picking the selected block
        console.log('Picking selected block:', selectedImage);
        const selectedImage_without_extension = selectedImage.slice(0, -4);

        try {
            await dispatch(updateBlocks(selectedImage_without_extension));
            //navigation.navigate('ProjectScreen', uid, projectName, selectedImage)
        } catch (e) {
            console.log(`here is the error ${e}`)
        }
        // Add your logic here
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageGrid}>
                    {imagePaths.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleImageSelect(imageFilenames[index])}
                            style={[
                                styles.imageContainer,
                                selectedImage === imageFilenames[index] && styles.selectedImageContainer,
                            ]}
                        >
                            <Image
                                source={image}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handlePickSelectedBlock} style={styles.button}>
                <Text style={styles.buttonText}>Pick Selected Block</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 60, // Adjust this value based on the button's height
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center images horizontally
    },
    imageContainer: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'transparent', // Initial border color
    },
    selectedImageContainer: {
        borderColor: 'blue', // Border color when image is selected
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LeggoScreen;
