/** 
 * @author Mike 
 * @attribution https://github.com/mrousavy/react-native-vision-camera/blob/main/package/example/src/App.tsx

*/
import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import PermissionsPage from './PermissionsPage';
// Screens
import HomeScreen from './Views/HomeScreen';
import ProjectScreen from './Views/ProjectScreen'
import SignUpScreen from './Views/SignUpScreen';
// import DetailsScreen from './screens/DetailsScreen';
// import PermissionsPage from './PermissionsPage';

const Stack = createStackNavigator();

const AppNavigator = (props: { initialRouteName: any; }) => {

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
                options={({ navigation }) => ({
                    headerTitle: 'Home',
                    headerLeft: null,
                })}
            />

            <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
            <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
        </Stack.Navigator >
    );
};



export default AppNavigator;
