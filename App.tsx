import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View , Text, TextInput, Button} from 'react-native';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import StartPage from './components/StartingPage'
import HomePage from './components/HomePage';
import HomeTabNavigator from './components/HomeTabNavigator';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpandedUserStory from './components/ExpandedUserStory';
import AddUserStoryForm from './components/AddUserStoryForm';
import AddUserStoryButton from './components/AddUserStoryButton';



const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const listOfVerifiedUsers: string[] = ['John', 'Wilfredo', 'Mark', 'Juan']
  const verifiedPassword: string = '1234'
  function isUser(username: string, password: string){
    if(listOfVerifiedUsers.includes(username) && verifiedPassword === password)
      setLoggedIn(true)
    else
      setLoggedIn(false)
    }
    return (
      <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn === false ? (
          <>         
          <Stack.Screen
          name="Start"
          component={StartPage}
          options ={{
          title: 'Start Page'
          }}
        />        
           
          <Stack.Screen
          name='Login'
          // component={LoginPage}
          >
            {(props) => <LoginPage {...props} bringStateUp={isUser}/>}
          </Stack.Screen>
          <Stack.Screen
          name='Register'
          component={RegisterPage}
          />
          </>
        ) : ( 
          <>
            <Stack.Screen
        name='Home'
        component={HomeTabNavigator}
        options={{
          // headerStyle:
          // background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        }}/>
        <Stack.Screen
        name='UserStory'
        component={ExpandedUserStory}
        />
        <Stack.Screen
        name="AddUserStoryForm"
        component={AddUserStoryForm}
        />
        <Stack.Screen
        name="AddUserStoryButton"
        component={AddUserStoryButton}
        />
        
        </>
        
        )}

      </Stack.Navigator>
      </NavigationContainer>
    
  );
  
}




const stylesLogin = StyleSheet.create({
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    height: '12%',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#5a65db',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'green'
  },
  navBarText:{
    marginTop: 40,
    fontSize: 40,
    color: 'white'
  },
  input:{
    height: 30,
    width: "75%",
    margin: 2,
    borderWidth: 1,
    padding: 3
  }
});
