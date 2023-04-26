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
export function writeUserData(story: UserStory) {

  geocode(story.address).then(resp=> {
    const latlong: LatLong = {
      latitude: resp[0].latitude,
      longitude: resp[0].longitude,
    }

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
    });}).catch(error => {
      console.error(error);
    });
  }
let tempArr : UserStory[] = []

async function monitorLocation(){

  console.log("Getting Position")
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

    console.log(latlong)

    let tempUserStory = []
    const usersRef = ref(database, "UserStories/"); //USE this idea for fetching all user stories
    await get(usersRef).then((snapshot) => {
    let currentStoryData = snapshot.val(); 
    for (let key in currentStoryData) {
        let temp = currentStoryData[key]
        tempUserStory.unshift(temp)
        }
    }).catch((error) => console.error(error));

    let locationCensoredUserStory = []

    for (const entry of tempUserStory)
    {
      let distance=haversine(latlong.latitude,latlong.longitude,entry["latlong"]["latitude"],entry["latlong"]["longitude"])
      console.log(entry["titleOfEvent"], " - Distance from User: ", distance)
      if (distance<MAXDISTANCE)
      {
        locationCensoredUserStory.push(entry)
      }
    }

    return (locationCensoredUserStory)
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
            if (Platform.OS === 'ios') 
              {
                console.log("//iOS boys please let me know if this closes")
                process.exit(0)
                
              }
            else
              {
                console.log("//Todo Shutdown App instead of backout")
                BackHandler.exitApp();
              }
          }
        }).catch(error => {console.error(error);});
      }
      else
      {
        console.log("already have permissions")
        monitorLocation();
      }

    }).catch(error => {
      console.error(error);
    });

  const [isLoggedIn, setLoggedIn] = useState(false)  
  const [listOfAllUserStories, setlistOfAllUserStories] = useState<UserStory[]>([])
  const [singleUserStory, setSingleUserStory] = useState<UserStory>(null)
  useEffect(()=> {
    if(singleUserStory === null){
      // console.log("No UserStory Added")
    }
    else{
      setlistOfAllUserStories([singleUserStory, ...listOfAllUserStories])
      setSingleUserStory(null)
    }
  }, [singleUserStory])
  

  
  
  
  async function RefreshPage(isLiked: boolean){
    // console.log("Liked Button Clicked")
    try{
      let tempUserStory : UserStory[] = await FetchAllUserStories()
      setlistOfAllUserStories(tempUserStory)
    }
    catch{
      console.log("Error in RefreshPage")
    }
    
    // console.log("This is inside of the liked userStory function",tempUserStory)
    // setSingleLike(true)
  }
  function addUserStory(userStory: UserStory){
    setSingleUserStory(userStory)
  }


  async function isUser(isLoggedIn: boolean){
    setLoggedIn(isLoggedIn);
    
    let userStories= await FetchAllUserStories()
    console.log("This is inside of the isUser function",userStories)
    
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
        // component={ExpandedUserStory}
        >
          {(props) => <ExpandedUserStory {...props} RefreshPage={RefreshPage} />}
        </Stack.Screen>
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
