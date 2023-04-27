import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/StartingPageStyle"

//Displays landing page for user to login or register
export default function StartPage({navigation}) {
  return (
    <View>
         <View style={styles.navBar}> 
    <Text style={styles.navBarText}>Adventure Time</Text>
  </View>
        <View>
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate('Register')} title='Go to register page' color='blue'></Button>
            <Button onPress={() => navigation.navigate('Login')} title='Go to login page' ></Button>
        </View>
        
        </View>
  </View>
   
  )
}