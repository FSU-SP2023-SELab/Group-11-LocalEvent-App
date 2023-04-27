 import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createDrawerNavigator} from '@react-navigation/drawer'
import HomePage from './HomePage'
import HomePageTopPosts from './HomePageTopPosts'
import { Button, View } from 'react-native'
import Settings from './Settings'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator();

// This component is used to navigate between the Home page and the Top Posts page
function HomeTabNavigator({listOfAllUserStories, refreshPage}) {

  let navigation = useNavigation()
  function myRefreshPage(){
    refreshPage()
  }
  return (
        <Tab.Navigator>
            <Tab.Screen
            name="RealHome"
            // component={HomePage}
            options={{
              title: 'All Posts',
              // Here we can add a button to navigate to the settings page
              headerLeft: () => (
                <Button onPress={() => navigation.navigate('Settings')}
                  title="Settings"
                  color="#0000FF"/>
              ),
              headerRight: () => (
                // Here we can add a button to refresh the page
                <Button onPress={() => myRefreshPage()}
                  title="Refresh"
                  color="#0000FF"/>
              ),
            }}
            >
              {(props) => <HomePage {...props} listOfAllUserStories={listOfAllUserStories}/>}
            </Tab.Screen>
            <Tab.Screen
            name="Best This Week"
            >
              {(props) => <HomePageTopPosts {...props} listOfAllUserStories={listOfAllUserStories}/>}
            </Tab.Screen>
        </Tab.Navigator>
        
  )
}

export default HomeTabNavigator