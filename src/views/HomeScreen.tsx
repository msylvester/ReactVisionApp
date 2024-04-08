// HomeScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import PictureCollection from '../Components/PictureCollection';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
    const openImagePicker = () => <PictureCollection />;

    return (
        // <SafeAreaView><Text>hello chat me </Text></SafeAreaView>
        <View style={styles.container}>
            <View style={styles.imageCollection} />
            <View style={styles.imagePick}>
                <Button title="Open from Device" onPress={openImagePicker} />
                {/* <PictureCollection /> */}
            </View>
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
