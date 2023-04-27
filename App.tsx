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
import { BackHandler, Platform} from 'react-native';
import * as process from 'process';




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
import { err } from 'react-native-svg/lib/typescript/xml';
import Settings from './components/Settings';
import { once } from 'process';
// This function writes the user data to the database
export function writeUserData(story: UserStory) {

  geocode(story.address).then(resp=> {
    const latlong: LatLong = {
      latitude: resp[0].latitude,
      longitude: resp[0].longitude,
    }
    // Here we create a new entry in the database with the user's data
    set(ref(database, 'UserStories/' + story.id), {
      id: story.id,
      numOfLikes: story.numOfLikes,
      nameOfUser: story.nameOfUser,
      dayOfEvent: story.dayOfEvent,
      timeOfEvent: story.timeOfEvent.toString(),
      timePostWasMade: story.timePostWasMade.toString(),
      titleOfEvent: story.titleOfEvent,
      pictureOfEvent: story.pictureOfEvent,
      eventDescription: story.eventDescription,
      latlong: latlong,
      userID: story.userID,
      address: story.address,
    });}).catch(error => {
      console.error(error);
    });
}
let tempArr : UserStory[] = []


async function monitorLocation(){

  let locationSubscription = await LocationPerms.watchPositionAsync(
    { accuracy: LocationPerms.Accuracy.Low, timeInterval: 10000, distanceInterval: 10 },
    location => {
      console.log(location);
    });

  }

const geocode = async(address) => {
  const geocodedLocation = await LocationPerms.geocodeAsync(address)
  return geocodedLocation;
}
// This function calculates the distance between two points on the surface of a sphere
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in Miles
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // Distance in Miles

  return d;
}

function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

// Querys the data base for all UserStories 
// and displays them if within an end users "distancePreference"
async function FetchAllUserStories(){
    let MAXDISTANCE = 50
    let auth = getAuth();
    let user = auth.currentUser;
    const usersDistanceRef = ref(database, "Users/" + user.uid);
    try{
      await get(usersDistanceRef).then((snapshot) => {
        let currentDistanceData = snapshot.val();
        MAXDISTANCE = currentDistanceData["distancePreference"]
      }).catch((error) => console.error(error));
    }
    catch(error){ 
      console.error("Error in FetchAllUserStories: ", error)
     }

    let currLoc=await LocationPerms.getLastKnownPositionAsync().catch((error) => console.error(error));

    const latlong: LatLong = {
      latitude: currLoc.coords.latitude, //Why my IDE say that coords doesnt exist?
      longitude: currLoc.coords.longitude,
    }

    let tempUserStory = []
    const usersRef = ref(database, "UserStories/");
    await get(usersRef).then((snapshot) => {
    let currentStoryData = snapshot.val(); 
    for (let key in currentStoryData) {
        let temp = currentStoryData[key]
        tempUserStory.unshift(temp)
      }
    }).catch((error) => console.error(error));

    let locationCensoredUserStory = []

    for (const entry of tempUserStory) {
      let distance=haversine(latlong.latitude,latlong.longitude,entry["latlong"]["latitude"],entry["latlong"]["longitude"])
      if (distance<MAXDISTANCE) {
        locationCensoredUserStory.push(entry)
      }
    }

    return (locationCensoredUserStory)
}

const Stack = createNativeStackNavigator();
export default function App() {


    //High Precision Location Detection
    //I dont entirely understand why this is a thing
    LocationPerms.hasServicesEnabledAsync().then(resp => {
      
      if (resp==false)
      {
        LocationPerms.enableNetworkProviderAsync()
      }
      else{
      }

    }).catch(error => {
      console.error(error);
    });

    //Acutally
    LocationPerms.getForegroundPermissionsAsync().then(resp => {
      
      if (resp.granted==false) {
        LocationPerms.requestForegroundPermissionsAsync().then(resp2=> {
          if (resp2.granted==false) {
            if (Platform.OS === 'ios') {
                process.exit(0)
              }
            else {
                BackHandler.exitApp();
              }
          }
        }).catch(error => {console.error(error);});
      }
      else {
        monitorLocation();
      }

    }).catch(error => {
      console.error(error);
    });
  // Here we set the useStates that will be propregated down to the children
  const [isLoggedIn, setLoggedIn] = useState(false)  
  const [listOfAllUserStories, setlistOfAllUserStories] = useState<UserStory[]>([])
  const [singleUserStory, setSingleUserStory] = useState<UserStory>(null)
  
  // This useEffect is used to add a new userStory to the listOfAllUserStories 
  useEffect(()=> {
    if(singleUserStory === null){
      return
    }
    else{
      setlistOfAllUserStories([singleUserStory, ...listOfAllUserStories])
      setSingleUserStory(null)
    }
  }, [singleUserStory])
  

  
  
  
  // This a general refresh function that is used to refresh the page
  async function RefreshPage(isLiked: boolean){
    try{
      let tempUserStory : UserStory[] = await FetchAllUserStories()
      setlistOfAllUserStories(tempUserStory)
    }
    catch{
      console.log("Error in RefreshPage")
    }

  }
  // This function is used to add a new userStory to the listOfAllUserStories
  function addUserStory(userStory: UserStory){
    setSingleUserStory(userStory)
  }

  // This function is used to set the isLoggedIn state
  // If it is true then the user is logged in and the home page is displayed
  async function isUser(isLoggedIn: boolean){
    setLoggedIn(isLoggedIn);
    
    let userStories= await FetchAllUserStories()
    
    setlistOfAllUserStories(userStories) //currentStoryDataJSON
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
          title: ""
          // background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        }}>
          {(props) => <HomeTabNavigator {...props} listOfAllUserStories={listOfAllUserStories} refreshPage={RefreshPage} />}
        </Stack.Screen>
        <Stack.Screen
        name='UserStory'
        >
          {(props) => <ExpandedUserStory {...props} RefreshPage={RefreshPage} />}
        </Stack.Screen>
        <Stack.Screen
        name="AddUserStoryForm"
        >
          {(props) => <AddUserStoryForm addUserStory={addUserStory} />}
        </Stack.Screen>
        <Stack.Screen
        name="AddUserStoryButton"
        component={AddUserStoryButton}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
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
