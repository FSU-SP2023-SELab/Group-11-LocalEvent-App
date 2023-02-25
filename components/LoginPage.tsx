import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


const LoginPage = ({bringStateUp}) => {
    // let h : number[] = []
    // let htmlRep : JSX.Element[]              VERY USEFUL
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    function isUser(){
        bringStateUp(username,password)
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return(
        <View style={styles.container}>
            
            <View style={styles.inputContainer}>
                <Text>Username</Text>
                <TextInput style={styles.input} onChangeText={(newText) => setUsername(newText)} value={username}/>
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={(newText) =>setPassword(newText)} defaultValue={password}/>
            </View>
  
            <Button onPress={() => isUser()} title='login' ></Button>
            {/* <Button onPress={() => navigation.navigate('Home')} title='Go To Home'></Button> */}
        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 250,
        height: 20,
        borderWidth: 1
        },
    inputContainer:{
        bottom:40 
    }
}
)
export default LoginPage