
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

    let listOfUserStories: JSX.Element[] = listOfAllUserStories.map((d, i) => {
        
        
        //code handles the use (clicking) of the like button
        //but the post is changing after being liked
        
        /*
        *
        *
        *   Code Below broke the Program. It complained that there too many 
        *   Re-Renders. Maybe we can hold this in a non-useState array?
        *   Or maybe do a useEffect in order to have that be rendered POST
        *   Page renders?
        * 
        * 
        */

        // const [isLiked, setIsLiked] = useState(likeStatus[d.id]);
        // const handlePress = () => {
        //     const updatedLikeStatus = [...likeStatus];
        //     updatedLikeStatus[d.id] = !isLiked;
        //     setLikeStatus(updatedLikeStatus);
        //     setIsLiked(!isLiked);
        // };  

        return(
      <TouchableOpacity onPress={()=> navigation.navigate('UserStory', {nameOfUser: d.nameOfUser, timeOfEvent: d.timeOfEvent, timePostWasMade: d.timePostWasMade, titleOfEvent: d.titleOfEvent, eventDescription: d.eventDescription})} key={"UserStory " + i.toString()}>
        <View style={styles.userStoryContainer}>
            <View style={styles.picTitleLikeContainer}>
                    <Image source={require('../Utils/Imgs/Party2.jpeg')} style={styles.picStyle} key={i}></Image> 
                <View style={styles.informationAboutEventContainer}>
                    <View style={styles.nameOfEventAndLikeButtonContainer}>
                        <Text>{d.titleOfEvent}</Text>

                        {/* <TouchableOpacity onPress={handlePress} key={i}>
                                   <Icon name={likeStatus[d.id] ? 'heart' : 'heart-o'} size={24} color={likeStatus[d.id] ? 'red' : 'black'} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.timeOfEventAndTimePostedContainer}>
                        <Text style={{textAlign:'left'}}> Starts: {d.timeOfEvent} </Text>
                        <Text>Posted: {d.timePostWasMade}</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 20, display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{textAlign: 'right'}}>Posted By: {d.nameOfUser}</Text>
                <Text style={{}}>Likes: {Number(d.numOfLikes) + Math.floor(Math.random() * 20) + 1}</Text>
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
