
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store';



const SignUpScreen = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigation = useNavigation();
    console.log(`username: ${user?.username}`)
    const handleSignUp = () => {
        // TODO: Implement sign-up logic (e.g., with Firebase auth)
        const userName = 'jane.doe2@example.com'
        auth()
            .createUserWithEmailAndPassword(userName, 'SuperSecretPassword!')
            .then(() => {
                console.log('User account created & signed in!');
                dispatch(setUser({
                    ...user, username: userName
                }));
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
                /*
                 ERROR  [Error: [auth/network-request-failed] A network error has occurred, please try again.]
                */
            });
        console.log('handleSignUp');
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
            {errorMessage && (
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            )}
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
            />
            <Button
                title="Sign Up"
                color="#e93766"
                onPress={handleSignUp}
            />
            <View>
                <Text>
                    Already have an account?{' '}
                    <Text
                        onPress={() => navigation?.navigate('Login')}
                        style={{ color: '#e93766', fontSize: 18 }}>
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    textInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SignUpScreen;
