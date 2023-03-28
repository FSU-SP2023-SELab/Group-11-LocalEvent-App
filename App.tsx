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

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { get, getDatabase } from 'firebase/database';
import { UserStory } from './Utils/Interfaces/Interfaces';
import { setTemplateUserStories } from './Utils/Functions/Functions';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCgrQn5pV4QgaHJ0UqIcyJv8PIfUhQMlkw",
  authDomain: "localeventapp.firebaseapp.com",
  databaseURL: "https://localeventapp-default-rtdb.firebaseio.com/",
  projectId: "localeventapp",
  storageBucket: "localeventapp.appspot.com",
  messagingSenderId: "713257283738",
  appId: "1:713257283738:web:0ee5ff844c08b50881af23"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const user = auth.currentUser;

//for writing to the database
import { ref, set } from "firebase/database";
import { UserStory } from './Utils/Interfaces/Interfaces';
export function writeUserData(story: UserStory) {
    set(ref(database, 'UserStories/' + story.id), {
      id: story.id,
      nameOfUser: story.nameOfUser,
      timeOfEvent: story.timeOfEvent.toString(),
      timePostWasMade: story.timePostWasMade.toString(),
      titleOfEvent: story.titleOfEvent,
      pictureOfEvent: story.pictureOfEvent,
      eventDescription: story.eventDescription,
      userID: story.userID,
    });
  }



const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  let listOfUserStoriesData = setTemplateUserStories()
  const [userStories, setUserStories] = useState<UserStory[]>(listOfUserStoriesData)
  const listOfVerifiedUsers: string[] = ['John', 'Wilfredo', 'Mark', 'Juan']
  const verifiedPassword: string = '1234'

  function isUser(isLoggedIn: boolean){
    setLoggedIn(isLoggedIn)
  }
  function addUserStory(userStory: UserStory){
    setUserStories([...userStories, userStory])
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
            {(props) => <LoginPage {...props} isUser={isUser}/>}
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
        // component={HomeTabNavigator}
        options={{
          // headerStyle:
          // background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        }}>
          {(props) => <HomeTabNavigator {...props} userStoryData={userStories} addUserStory={addUserStory}/>}
        </Stack.Screen>
        <Stack.Screen
        name='UserStory'
        component={ExpandedUserStory}
        />
        <Stack.Screen
        name="AddUserStoryForm"
        // component={AddUserStoryForm}
        >
          {(props) => <AddUserStoryForm addUserStory={addUserStory} />}
        </Stack.Screen>
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
