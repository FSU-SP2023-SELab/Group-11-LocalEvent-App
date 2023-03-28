import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/StartingPageStyle"
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
            <Button onPress={() => navigation.navigate('Home')} title = 'Home Page'></Button>
        </View>
        
        </View>
  </View>
   
  )
}