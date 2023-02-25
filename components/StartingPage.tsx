import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function StartPage({navigation}) {
  function runNavigate(){
        navigation.navigate('Layer1')
  }
  return (
    <View>
         <View style={styles.navBar}> 
    <Text style={styles.navBarText}>Adventure Time</Text>
  </View>
        <View>
        <Text>This is currently the home page.</Text>
        <Text>Select what page you would like to go to</Text>
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate('Register')} title='Go to register page' color='blue'></Button>
            <Button onPress={() => navigation.navigate('Login')} title='Go to login page' ></Button>
            <Button onPress={() => navigation.navigate('Home')} title = 'Home Page'></Button>
        </View>
        
        </View>
  </View>
   
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBar: {
      height: 80,
      position: 'relative',
      top: 0,
      right: 0,
      width: '100%',
      backgroundColor: '#5a65db',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: 'green'
    },
    navBarText:{
      marginTop: 15,
      fontSize: 40,
      color: 'white'
    },
    buttonContainer:{
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 500

    }
  });
