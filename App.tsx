import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AppState, StyleSheet, View , Text, TextInput, Button, NativeModules} from 'react-native';
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
import { UserStory, LatLong } from './Utils/Interfaces/Interfaces';
import * as LocationPerms from 'expo-location';
import { BackHandler } from 'react-native';

LocationPerms.enableNetworkProviderAsync()

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
export function writeUserData(story: UserStory) {

  geocode(story.address).then(resp=> {
    const latlong: LatLong = {
      latitude: resp[0].latitude,
      longitude: resp[0].longitude,
    }

    set(ref(database, 'UserStories/' + story.id), {
      id: story.id,
      numOfLike: story.numOfLikes,
      nameOfUser: story.nameOfUser,
      dayOfEvent: story.dayOfEvent,
      timeOfEvent: story.timeOfEvent.toString(),
      timePostWasMade: story.timePostWasMade.toString(),
      titleOfEvent: story.titleOfEvent,
      pictureOfEvent: story.pictureOfEvent,
      eventDescription: story.eventDescription,
      latlong: latlong,
      userID: story.userID,
    });}).catch(error => {
      console.error(error);
    });
  }
let tempArr : UserStory[] = []

const geocode = async(address) => {
  const geocodedLocation = await LocationPerms.geocodeAsync(address)
  console.log(geocodedLocation)
  return geocodedLocation;
}

const Stack = createNativeStackNavigator();
export default function App() {

  console.log("starting App")
  

    //High Precision Location Detection
    //I dont entirely understand why this is a thing
    LocationPerms.hasServicesEnabledAsync().then(resp => {
      
      console.log(resp)
      if (resp==false)
      {
        console.log("Asking for Permissions")
        LocationPerms.enableNetworkProviderAsync()
      }
      else
      {
        console.log("Network Services On")
      }

    }).catch(error => {
      console.error(error);
    });

    //Acutally
    LocationPerms.getForegroundPermissionsAsync().then(resp => {
      
      console.log(resp)
      if (resp.granted==false)
      {
        console.log("Asking for Permissions")
        LocationPerms.requestForegroundPermissionsAsync().then(resp2=> {
          if (resp2.granted==false)
          {
            console.log("//Todo Shutdown App instead of backout")
            BackHandler.exitApp()
          }
        }).catch(error => {console.error(error);});
      }
      else
      {
        console.log("already have permissions")
      }

    }).catch(error => {
      console.error(error);
    });

  const [isLoggedIn, setLoggedIn] = useState(false)  
  let tempUserStory
  //!!! query the database and put the posts in the empty array below
  //change function name !!!
  const [listOfAllUserStories, setlistOfAllUserStories] = useState<UserStory[]>([])
  const [singleUserStory, setSingleUserStory] = useState<UserStory>(null)
  useEffect(()=> {
    if(singleUserStory === null){
      console.log("No UserStory Added")
    }
    else{
      setlistOfAllUserStories([singleUserStory, ...listOfAllUserStories])
      setSingleUserStory(null)
    }
  }, [singleUserStory])
  async function isUser(isLoggedIn: boolean){
    setLoggedIn(isLoggedIn);
    let tempUserStory = []
    const usersRef = ref(database, "UserStories/"); //USE this idea for fetching all user stories
    await get(usersRef).then((snapshot) => {
    let currentStoryData = snapshot.val(); 
    //let currentStoryDataJSON = snapshot.val().toJSON(); 
    //console.log(currentStoryData)
    for (let key in currentStoryData) {
        let temp = currentStoryData[key]
        tempUserStory.unshift(temp)
        // console.log(temp)
        // tempArr.push(temp)
        }}).catch((error) => console.error(error));
    console.log(tempUserStory)
    setlistOfAllUserStories(tempUserStory) //currentStoryDataJSON
  }

  function addUserStory(userStory: UserStory){
    // let tempUserStory = listOfAllUserStories
    // tempUserStory.unshift(userStory)
    // setlistOfAllUserStories(tempUserStory)
    setSingleUserStory(userStory)
    // fetchAllStories();
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
          {(props) => <HomeTabNavigator {...props} listOfAllUserStories={listOfAllUserStories} />}
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
