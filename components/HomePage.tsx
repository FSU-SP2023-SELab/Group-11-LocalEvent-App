
import React, { useEffect, useState, useCallback } from 'react'
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {UserStory} from '../Utils/Interfaces/Interfaces'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Utils/Styles/HomePageStyle'
import AddUserStoryButton from './AddUserStoryButton';
import AddUserStoryForm from './AddUserStoryForm';
import { useNavigation, useRoute } from '@react-navigation/native';


function HomePage({listOfAllUserStories, listOfRandomLikes}) {
    const navigation = useNavigation()

    const [likeStatus, setLikeStatus] = useState<boolean[]>(new Array(11).fill(false));

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
                {/* <Text style={{}}>Likes: {Number(d.numOfLikes) + Math.floor(Math.random() * 20) + 1}</Text> */}
                <Text style={{}}>Likes: {listOfRandomLikes[index]}</Text>
            </View>
        </View>
      </TouchableOpacity> 
    )})
    
  return (
    <>
        <ScrollView>
            {listOfUserStories}
        </ScrollView>       
        <View style={buttonStyles.buttonContainer}>
            <AddUserStoryButton/>       
        </View>
    </>
    
  )
}
export default HomePage

const buttonStyles = StyleSheet.create({
    buttonContainer:{
        display: "flex",
        justifyContent: 'flex-end',
        marginBottom: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 50
    },
    tempButtonContainer: {
        display: "flex",
        justifyContent: 'flex-end',
        marginBottom: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 50
    },
    buttonStyle:{
        position: 'absolute',
        bottom: 0
    }
})
