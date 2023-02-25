import React from 'react'
import {Text, View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {UserStory} from '../Utils/Interfaces/Interfaces'
function HomePage({navigation}) {
    const listOfUsers : string[] = ['John', 'Wilfredo', 'Juan', 'Mark']
    const listOfTitles : string[] = ['Lets Party', 'Getting Dirty', 'Water Fiasco', 'Baking with Becky']
    const listOfDates : Date[] = [new Date("9/11/2001"), new Date("04/02/2023"), new Date('10/12/2020'), new Date()]
    const listOfUserStoriesData : UserStory[] = []
    for(var i = 0; i < 25; i++){
        const temp : UserStory = {
            nameOfUser : listOfUsers[Math.floor(Math.random() *4)],
            timeOfEvent: listOfDates[Math.floor(Math.random() *4)],
            timePostWasMade: listOfDates[Math.floor(Math.random() *4)],
            titleOfEvent: listOfTitles[Math.floor(Math.random() *4)],
            pictureOfEvent: 'Picture'
        }
        listOfUserStoriesData.push(temp)
    }

    const listOfUserStories: JSX.Element[] = listOfUserStoriesData.map((d, i) => {
        return(
            <TouchableOpacity onPress={() => navigation.navigate("UserStory")} key={i}>
                <View style={styles.userStoryContainer} >
                    <View style={styles.pictureTitleContainer}>
                        <Image source={require('../Utils/Imgs/Party.webp')} style={styles.pictureStyle} key={i}></Image>
                        <View style={styles.nameOfEventContainer}>
                            <Text>{d.titleOfEvent}</Text>
                            <View style={styles.timeOfEventContainer}>
                                <Text>Event Starts: {d.timeOfEvent.toLocaleDateString('en-US')}</Text>
                                <Text style={styles.timePostedText}> Posted on: {d.timePostWasMade.toLocaleDateString('en-US')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.nameOfUserContainer}>
                        <Text>Posted by: {d.nameOfUser}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    })
  return (
    <ScrollView>
       {listOfUserStories}
    </ScrollView>
    
  )
}
const styles = StyleSheet.create({
    userStoryContainer:{
        width: "100%",
        height: 100,
        borderWidth: 1,
    },
    pictureTitleContainer:{
        flex:1,
        flexDirection: 'row',
        height:"75%",
        width:"100%",
    },
    pictureStyle:{
        width: 100,
        height:"100%",
    },
    nameOfEventContainer: {
        position:'relative',
        borderColor: 'lightblue',
        borderWidth: 1,
        width:"77%",
        height: "100%",
        // alignContent:'center',
        // justifyContent: 'center'
    },
    timeOfEventContainer:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignContent: 'space-between',
        height:'100%'

    },
    timePostedText:{
        alignSelf:'flex-end'
    },
    nameOfUserContainer:{
        flex:0,
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        alignItems:'flex-end',
        justifyContent:'flex-end'
    }
    
    
});

export default HomePage