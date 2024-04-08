/** 
 * @author Mike 
 * @attribution https://github.com/mrousavy/react-native-vision-camera/blob/main/package/example/src/App.tsx

*/
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TouchableOpacity, Text } from 'react-native';
import ProjectScreen from './Views/ProjectScreen';
import { Camera } from 'react-native-vision-camera';
import type { Routes } from './Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Views/HomeScreen';

import SignUpScreen from './Views/SignUpScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import PermissionsPage from './PermissionsPage';

const Stack = createStackNavigator();

const AppNavigator = props => {
    // const cameraPermission = Camera.getCameraPermissionStatus();
    // const microphonePermission = Camera.getMicrophonePermissionStatus();
    // const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'

    const { initialRouteName } = props;
    console.log(`here is the initial route name ${initialRouteName}`)
    return (

        <Stack.Navigator
            screenOptions={{
                // headerShown: false,
                statusBarStyle: 'dark',
                animationTypeForReplace: 'push',
            }}
            initialRouteName={initialRouteName}>

            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            // options={({ navigation }) => ({
            //     headerTitle: 'Home',
            //     headerLeft: () => (
            //         <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            //             <Text>Press Here</Text>
            //         </TouchableOpacity>
            //     ),
            // })}
            />
        </Stack.Navigator >
    );
};



export default AppNavigator;
