import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/LoginPageStyle"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//This function checks login input with database
const LoginPage = ({isUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPassword, setIsValidPassword] = useState(true)

    const auth = getAuth();

    // This function uses the sign in function from firebase auth library to 
    // veryify that an end user has a firebase account, if not give the use and error message
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setIsValidPassword(true)
            const user = userCredential.user;
            isUser(true)
        })
        .catch((error) => {
            setIsValidPassword(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            isUser(false)
        });
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.inputContainer}>
                <Text>Email</Text>
                {/* {the value and defaultValue may or may not be neccesary} */}
                <TextInput style={styles.input} onChangeText={(newText) => setEmail(newText)} value={email} />
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={(newText) =>setPassword(newText)} defaultValue={password} 
                secureTextEntry={true}/>
            </View>

            {
            !isValidPassword && 
            <View>
                <Text> You entered the wrong password </Text>
            </View>
            }
  
            <Button onPress={() => handleLogin()} title='login' ></Button>
        </View>
       
    )
}

export default LoginPage;
