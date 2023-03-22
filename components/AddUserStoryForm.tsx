import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Button, TouchableHighlight, TextInput} from 'react-native'
import { UserStory } from '../Utils/Interfaces/Interfaces';
import { useNavigation } from '@react-navigation/native';
const dateTemplate = "(MM/DD/YYYY)"





function isNumber(char: string){
    return /^\d+$/.test(char);
}



function AddUserStoryForm({changePagePlusAddUserStory}) {
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventTime, setEventTime] = useState('')
    const navigation = useNavigation()
    const data = 0
    // const changePage = () =>{
    //     navigation.navigate("Home", {data:data})
    // }

    function changingPagePlusAddingUserStory(){
        console.log(eventTime)
        //Checks to see if time is in correct format
    if(eventTime.length !== 10)
        console.log("Wrong Time Format")
    else if(!isNumber(eventTime.substring(0,2)))
        console.log("Wrong Time Format")
    else if(eventTime[2] !== '/')
        console.log('Wrong Time Format')
    else if(!isNumber(eventTime.substring(3,5)))
        console.log('Wrong Time Format')
    else if(eventTime[5] !== '/')
        console.log('Wrong Time Format')
    else if(!isNumber(eventTime.substring(6,10)))
        console.log('Wrong Time Format')
    else{
        const temp : UserStory = {
            id: 32,
            nameOfUser: "John",
            timeOfEvent: new Date(eventTime),
            timePostWasMade: new Date(eventTime),
            titleOfEvent: eventTitle,
            pictureOfEvent: "Naw",
            eventDescription: eventDescription
        }
        // const temp1 : number = 0
        changePagePlusAddUserStory(temp)
    }
}
// useEffect(()=>{
//         changePagePlusAddUserStory(changingPagePlusAddingUserStory(), listOfUserStories)
//     })
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={{fontSize: 40}}>Enter Title Of Event:</Text>
            <TextInput  onChangeText={(text) => setEventTitle(text)}  style={{borderWidth: 2, borderColor: 'pink', height: 45, width: "50%"}}></TextInput>
        </View>
        <View style={{marginTop: 5}}>
            <Text style={{fontSize: 37}}>Enter Description Of Event </Text>
            <TextInput onChangeText={(text) => setEventDescription(text)} blurOnSubmit={true} multiline={true} style={{textAlign:'auto', textAlignVertical: 'top', borderWidth: 2, borderColor: 'lime' ,height: 200, width: '60%'}}> </TextInput>
        </View> 
        {/* A simple form for the user to input new userStory */}
        <View style={{marginTop : 5}}>
            <Text style={{fontSize: 25}}> Enter Date Of Event {dateTemplate}</Text>
            <TextInput onChangeText={(text) => setEventTime(text)} style={{borderWidth: 2, borderColor: 'cyan', height: 30, width: "60%"}}></TextInput>
        </View>
        <View style={styles.publishButton}>
            <Button onPress={()=>changingPagePlusAddingUserStory()} title="Publish" color="#9CF22F"/>
        </View>
    </View>
  )
}

export default AddUserStoryForm

const styles = StyleSheet.create({
    container: {
        flex:1
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    publishButton:{
        position: 'absolute',
        bottom: 40,
        height: 40,
        width: '99%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'green',
    },
    titleContainer:{
        display: 'flex',
        flex: 1,
        maxHeight:120,
        width: '100%',
        borderWidth: 1,
        borderColor: 'green'
    },
    textFont:{
        fontSize: 40

    }
})