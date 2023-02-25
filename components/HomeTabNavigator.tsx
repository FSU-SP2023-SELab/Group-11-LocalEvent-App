import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createDrawerNavigator} from '@react-navigation/drawer'
import HomePage from './HomePage'
import HomePageTopPosts from './HomePageTopPosts'
import { View } from 'react-native'
import Settings from './Settings'

const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();
function HomeTabNavigator() {
  return (
        <Tab.Navigator>
            <Tab.Screen
            name="RealHome"
            component={HomePage}/>
            <Tab.Screen
            name="Best This Week"
            component={HomePageTopPosts}/>
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