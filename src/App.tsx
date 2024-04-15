import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import auth, { getAuth } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Camera } from 'react-native-vision-camera';
import { createStackNavigator } from '@react-navigation/stack';
import { setUser } from './store';
import { getUser } from './services/firebase'


const Stack = createStackNavigator();
function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setLocalUser] = useState();
  const [initialRoute, setInitialRoute] = useState('SignUpScreen');
  const permissionCamera = Camera.getCameraPermissionStatus();
  const dispatch = useDispatch();



  /**
   * onAuthStateChanged: Listener to get Login Details 
   */
  const onAuthStateChanged = async () => {

    const { uid, email } = getAuth().currentUser
    console.log(`here is the uid ${uid}`)
    const u = await getUser(uid)
    const { projects } = u;
    //setLocalUser({ uid, email });
    console.log(`here is the u ${JSON.stringify(u)}`)
    await dispatch(setUser({
      uid,
      permissionCamera,
      email,
      projects
    }));
    setInitialRoute('HomeScreen')

    console.log(`here is u ${JSON.stringify(u)}`)
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={'blue'} size="large" />
    </View>
  );

  // if (!user) {
  //   return (<NavigationContainer>
  //     <GestureHandlerRootView style={styles.root}>
  //       <AppNavigator initialRouteName={'SignUpScreen'} />
  //     </GestureHandlerRootView>
  //   </NavigationContainer>)
  // }

  return (

    <NavigationContainer>
      <GestureHandlerRootView style={styles.root}>
        <AppNavigator initialRouteName={initialRoute} />
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