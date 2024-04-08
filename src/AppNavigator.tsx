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
import { Camera } from 'react-native-vision-camera'
// import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Views/HomeScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import PermissionsPage from './PermissionsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
    // const cameraPermission = Camera.getCameraPermissionStatus();
    // const microphonePermission = Camera.getMicrophonePermissionStatus();
    // const showPermissionsPage = cameraPermission !== 'granted' || microphonePermission === 'not-determined'
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            {/* initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}>
            <Stack.Screen name="PermissionsPage" component={PermissionsPage} /> */}
            <Stack.Screen
                name="Home"
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
            <Stack.Screen name="Details" component={ProjectScreen} />
        </Stack.Navigator>
    );
};



export default AppNavigator;
