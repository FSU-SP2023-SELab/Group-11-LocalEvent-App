import React, { useEffect, useState, useCallback } from 'react'
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {UserStory} from '../Utils/Interfaces/Interfaces'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Utils/Styles/HomePageStyle'
import AddUserStoryButton from './AddUserStoryButton';
import AddUserStoryForm from './AddUserStoryForm';
import { useRoute } from '@react-navigation/native';

function HomePage({navigation, route}) {

    const listOfUsers : string[] = ['John', 'Wilfredo', 'Juan', 'Mark']
    const listOfTitles : string[] = ['Lets Party', 'Getting Dirty', 'Water Fiasco', 'Baking with Becky']
    const listOfDates : Date[] = [new Date("9/11/2001"), new Date("04/02/2023"), new Date('10/12/2020'), new Date()]
    const listOfPics: string[] = ['../Utils/Imgs/Party.webp', '../Utils/Imgs/Party2.jpeg']
    const listOfUserStoriesData : UserStory[] = []

    const [likeStatus, setLikeStatus] = useState<boolean[]>(new Array(11).fill(false));
    for(var i = 0; i < 10; i++) {
        const temp : UserStory = {
            id: i,
            nameOfUser : listOfUsers[Math.floor(Math.random() *4)],
            timeOfEvent: listOfDates[Math.floor(Math.random() *4)],
            timePostWasMade: listOfDates[Math.floor(Math.random() *4)],
            titleOfEvent: listOfTitles[Math.floor(Math.random() *4)],
            pictureOfEvent: listOfPics[Math.floor(Math.random() *2)],
            eventDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem non praesentium aliquid adipisci. Laboriosam eum, maiores ullam quisquam rerum perferendis debitis tempora fuga natus, molestiae deserunt possimus sunt modi unde!"
        }
        listOfUserStoriesData.push(temp)  // Starter Entries 
    }
    // setUserStories(userStories.concat(listOfUserStoriesData))
    //setUserStories(listOfUserStoriesData) 
    
    const [userStories, setUserStories] = useState<UserStory[]>(listOfUserStoriesData)
    const [changePage, setChangePage] = useState(true)
    const changePagePlusAddUserStory = ( userStory: UserStory ) => {
        setChangePage(!changePage)  // Changes Page back to Home Page
        setUserStories([...userStories, userStory])
         // Adds New User Stories
    }
    const changePageFunc = () =>{
        setChangePage(!changePage)  //Just Changes the Page back to Home Page
    }

    let listOfUserStories: JSX.Element[] = userStories.map((d, i) => {
        
        
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
      <TouchableOpacity onPress={()=> navigation.navigate('UserStory', {nameOfUser: d.nameOfUser, timeOfEvent: d.timeOfEvent.toLocaleString('en-US'), timePostWasMade: d.timePostWasMade.toLocaleDateString('en-US'), titleOfEvent: d.titleOfEvent, eventDescription: d.eventDescription})} key={"UserStory " + i.toString()}>
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
                        <Text style={{textAlign:'left'}}> Starts: {d.timeOfEvent.toLocaleDateString('en-US')} </Text>
                        <Text>Posted: {d.timePostWasMade.toLocaleDateString('en-US')}</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 20}}>
                <Text style={{textAlign: 'right'}}>Posted By: {d.nameOfUser}</Text>
            </View>
        </View>
      </TouchableOpacity> 
    )})
    
  return (
    <>
    {changePage ? (<>
        <ScrollView>
            {listOfUserStories}
        </ScrollView>       
        <View style={buttonStyles.buttonContainer}>
            <AddUserStoryButton changePage={changePageFunc}/>       
        </View>
        </>
        // This switches between pages based on changePage! Uses Turnary Operator
        ):(
        <>
        <AddUserStoryForm changePagePlusAddUserStory={changePagePlusAddUserStory}></AddUserStoryForm>
        </>
        )}
        
 
        
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