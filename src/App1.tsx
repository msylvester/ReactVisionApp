import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import SignUp from './Views/SignUpSCreen';
import type { Routes } from './Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    Provider,
    useDispatch,
    useSelector
} from 'react-redux';
import { store, setUser } from './store';
import HomeScreen from './Views/HomeScreen';
import LoginScreen from './Views/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Views/SignUpScreen';

const Stack = createStackNavigator();
function App1() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setLocalUser] = useState();
    const dispatch = useDispatch();
    let initialRouteName = 'HomeScreen';
    // Handle user state changes
    function onAuthStateChanged(user: any) {
        // console.log(`the user is ${JSON.stringify(user.providerData[0].uid)}`)
        const { uid } = user.providerData[0]
        console.log(`the user id is ${uid}`)
        setLocalUser(user);
        dispatch(setUser({
            username: uid
        }));
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        initialRouteName = 'SignUpScreen';
    }

    return (

        <NavigationContainer>
            <GestureHandlerRootView style={styles.root}>
                <AppNavigator initialRouteName={initialRouteName} />
            </GestureHandlerRootView>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
})
export default App1;