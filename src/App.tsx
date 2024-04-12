import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import auth, { getAuth } from '@react-native-firebase/auth';
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
import { Camera } from 'react-native-vision-camera';
import { store, setUser } from './store';
import HomeScreen from './Views/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Views/SignUpScreen';


const Stack = createStackNavigator();
function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setLocalUser] = useState();
  const permissionCamera = Camera.getCameraPermissionStatus();
  const dispatch = useDispatch();
  let initialRouteName = 'HomeScreen';


  // Handle user state changes
  function onAuthStateChanged(user: any) {
    // console.log(`the user is ${JSON.stringify(user.providerData[0].uid)}`)
    const { uid, email } = getAuth().currentUser
    console.log(`her is the uid ${uid}`)
    // console.log(`here is the auth ${JSON.stringify(getAuth().currentUser)}`)
    console.log(Object.entries(user.providerData));
    console.log(`the user id is ${uid}`)
    console.log(JSON.stringify(getAuth().currentUser.uid))
    setLocalUser(user);
    dispatch(setUser({
      uid,
      permissionCamera,
      email,
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
export default App;