import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/RegisterPageStyle"
export default function RegisterPage({navigation}){
  return (
    <View style={styles.container}>
        <View style={styles.miniContainer}>
        <Text>First Name</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Last Name</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Username</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Password</Text>
        <TextInput style={styles.input}></TextInput>
        <Text>Re-Enter Password</Text>
        <TextInput style={styles.input}></TextInput>
        </View>
        
        {/* <Button onPress={()=> navigation.navigate('Home')} title='Go to Home'></Button> */}
    </View>
  )
}
