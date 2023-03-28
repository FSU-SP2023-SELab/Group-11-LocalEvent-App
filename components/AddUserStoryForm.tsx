import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Button, TouchableHighlight, TextInput} from 'react-native'
import { UserStory } from '../Utils/Interfaces/Interfaces';
import { useNavigation } from '@react-navigation/native';
import { TimeIsCorrect } from '../Utils/Functions/Functions';
const dateTemplate = "(MM/DD/YYYY)"

function AddUserStoryForm({addUserStory}) {
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [isEventTimeIncorrect, setIsEventTimeIncorrect] = useState(false)
    const navigation = useNavigation()
    const data = 0
    // const changePage = () =>{
    //     navigation.navigate("Home", {data:data})
    // }

    function changingPagePlusAddingUserStory(){
    if(TimeIsCorrect(eventTime)){
        const temp : UserStory = {
            id: 32,
            nameOfUser: "John",
            timeOfEvent: new Date(eventTime),
            timePostWasMade: new Date(eventTime),
            titleOfEvent: eventTitle,
            pictureOfEvent: "Naw",
            eventDescription: eventDescription
        }
        setIsEventTimeIncorrect(false)
        addUserStory(temp)
        navigation.navigate('Home')
    }
    else{
        setIsEventTimeIncorrect(true)
    }
}

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
            <Text style={{fontSize: 25}}>Enter Date Of Event {dateTemplate}</Text>
            <TextInput onChangeText={(text) => setEventTime(text)} style={{borderWidth: 2, borderColor: 'cyan', height: 30, width: "60%"}}></TextInput>
        </View>
        <View>
            {isEventTimeIncorrect && <Text style={{color: "red"}}>The time entered is incorrect format {'\n'}Please enter it such that "MM/DD/YYYY"</Text>}
        </View>
        <View style={{marginTop: 5}}>
            <Text style={{fontSize: 25}}>Enter Time Of Event</Text>
            <TextInput style={{borderWidth: 2, borderColor: 'red', height: 30, width: "60%"}}></TextInput>
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