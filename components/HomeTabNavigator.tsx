 import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createDrawerNavigator} from '@react-navigation/drawer'
import HomePage from './HomePage'
import HomePageTopPosts from './HomePageTopPosts'
import { View } from 'react-native'
import Settings from './Settings'

const Tab = createBottomTabNavigator();



//const Drawer = createDrawerNavigator();
function HomeTabNavigator({listOfAllUserStories}) {
  let listOfRandomLikes : number[] = []
  for(let i = 0; i < listOfAllUserStories.length; i++){
    listOfRandomLikes.push(Math.floor((Math.random()*10))+ 1) 
  }

  return (
        <Tab.Navigator>
            <Tab.Screen
            name="RealHome"
            // component={HomePage}
            options={{
              title: ''
            }}
            >
              {(props) => <HomePage {...props} listOfAllUserStories={listOfAllUserStories} listOfRandomLikes = {listOfRandomLikes}/>}
            </Tab.Screen>
            <Tab.Screen
            name="Best This Week"
            // component={HomePageTopPosts}
            >
              {(props) => <HomePageTopPosts {...props} listOfAllUserStories={listOfAllUserStories} listOfRandomLikes= {listOfRandomLikes}/>}
            </Tab.Screen>
        </Tab.Navigator>
        // <Drawer.Navigator>
        //     <Drawer.Screen
        //     name="Settings"
        //     component={Settings}
        //     />
        // </Drawer.Navigator>
        
  )
}

export default HomeTabNavigator