import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../Utils/Styles/HomePageStyle'
function HomePageTopPosts({listOfAllUserStories, listOfRandomLikes}) {

    const navigation =  useNavigation()
    let myList = listOfRandomLikes
    // myList.sort((p1,p2) => p1.id > p2.id ? 1 : p1.id < p2.id ? -1 : 0 )
    myList.sort((a,b) => b-a)
    let listOfUserStories: JSX.Element[] = listOfAllUserStories.map((d, index) => {

    return(
  <TouchableOpacity onPress={()=> navigation.navigate('UserStory', {nameOfUser: d.nameOfUser, timeOfEvent: d.timeOfEvent, timePostWasMade: d.timePostWasMade, titleOfEvent: d.titleOfEvent, eventDescription: d.eventDescription})} key={"UserStory " + index.toString()}>
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
              <Text style={{}}>Likes: {myList[index]}</Text>
        </View>
    </View>
  </TouchableOpacity> 
)})
  return (
    <ScrollView>
      {listOfUserStories}
    </ScrollView>
  )
}

export default HomePageTopPosts