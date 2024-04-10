import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Image,
    Platform,
    PermissionsAndroid,
    StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { setCameraPermission, clearCameraPermission } from '../store'
import { useDispatch, useSelector } from 'react-redux';

const PermissionsScreen = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const permissionCameraRoll = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            if (permissionCameraRoll !== RESULTS.GRANTED) {
                await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            }
        } else {
            const permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (permission !== RESULTS.GRANTED) {
                await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            }
        }
    };

    const pickImage = () => {
        ImagePicker?.launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (!response.didCancel) {
                    setImage(response?.uri);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default PermissionsScreen