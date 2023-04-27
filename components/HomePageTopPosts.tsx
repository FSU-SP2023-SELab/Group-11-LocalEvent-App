import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../Utils/Styles/HomePageStyle'
import { UserStory } from '../Utils/Interfaces/Interfaces'
// This component is used to display the user stories with the most likes at the top of the home page
function HomePageTopPosts({listOfAllUserStories}) {

    const navigation =  useNavigation()
    let myList : UserStory[] = []
    for(let i = 0; i < listOfAllUserStories.length; i++)
      myList.push(listOfAllUserStories[i])
    // sort the list of user stories by the number of likes
    myList.sort((p1,p2) => p1.numOfLikes < p2.numOfLikes ? 1 : p1.numOfLikes > p2.numOfLikes ? -1 : 0 )

    // convert to JSX.Element array using map
    let listOfUserStories: JSX.Element[] = myList.map((d, index) => {

    return(
  <TouchableOpacity onPress={()=> navigation.navigate('UserStory', {address: d.address, dayOfEvent: d.dayOfEvent, nameOfUser: d.nameOfUser, timeOfEvent: d.timeOfEvent, timePostWasMade: d.timePostWasMade, titleOfEvent: d.titleOfEvent, eventDescription: d.eventDescription, numOfLikes: d.numOfLikes, id: d.id})} key={"UserStory " + index.toString()}>
    <View style={styles.userStoryContainer}>
        <View style={styles.picTitleLikeContainer}>
                <Image source={require('../Utils/Imgs/Party2.jpeg')} style={styles.picStyle} key={index}></Image> 
            <View style={styles.informationAboutEventContainer}>
                <View style={styles.nameOfEventAndLikeButtonContainer}>
                    <Text>{d.titleOfEvent}</Text>
                </View>
                <View style={styles.timeOfEventAndTimePostedContainer}>
                    <Text style={{textAlign:'left'}}> Starts: {d.timeOfEvent} </Text>
                    <Text>Posted: {d.timePostWasMade}</Text>
                </View>
            </View>
        </View>
        <View style={{height: 20, display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{textAlign: 'right'}}>Posted By: {d.nameOfUser}</Text>
              <Text style={{}}>Likes: {d.numOfLikes}</Text>
        </View>
    </View>
  </TouchableOpacity> 
)})
// return the list of user stories in a scroll view
  return (
    <ScrollView>
      {listOfUserStories}
    </ScrollView>
  )
}

export default HomePageTopPosts