// HomeScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import PictureCollection from '../Components/PictureCollection';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCollection from '../Components/ImageCollection';
import GenericIcon from '../img/addProject.png';
import SecondIcon from '../img/phone.png'

function HomeScreen() {
    const openImagePicker = () => <PictureCollection />;
    const images = [
        { id: '1', source: GenericIcon, label: "Add Project" },
        { id: '2', source: SecondIcon, label: "Project 1" },
        // Add more image objects as needed
    ];
    return (
        // <SafeAreaView><Text>hello chat me </Text></SafeAreaView>
        <View style={styles.container}>
            <View style={styles.imageCollection} >
                <ImageCollection images={images} />
            </View>
            {/* <View style={styles.imagePick}>
                <Button title="Open from Device" onPress={openImagePicker} />
              
                {/* <PictureCollection /> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageCollection: {
        flex: 3,
        backgroundColor: 'blue', // Adjust styling as needed
    },
    imagePick: {
        flex: 1,
        backgroundColor: 'green', // Adjust styling as needed
    },
});

export default HomeScreen;
