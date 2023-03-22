import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/LoginPageStyle"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({isUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('')

    const auth = getAuth();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setLoginStatus('Login Successful')
            isUser(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginStatus('Login Failed')
            isUser(false)
        });
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.inputContainer}>
                <Text>Username</Text>
                {/* {the value and defaultValue may or may not be neccesary} */}
                <TextInput style={styles.input} onChangeText={(newText) => setEmail(newText)} value={email} />
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={(newText) =>setPassword(newText)} defaultValue={password} />
            </View>
  
            <Button onPress={() => handleLogin()} title='login' ></Button>
        </View>
       
    )
}
export default LoginPage;