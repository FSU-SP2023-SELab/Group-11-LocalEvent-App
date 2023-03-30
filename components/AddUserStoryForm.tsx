import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Button, TouchableHighlight, TextInput} from 'react-native'
import { UserStory } from '../Utils/Interfaces/Interfaces';
import { useNavigation } from '@react-navigation/native';

import { EventTimeIsCorrect, DayIsCorrect, futureTime } from '../Utils/Functions/Functions';
import { SelectList } from 'react-native-dropdown-select-list';
import { writeUserData } from '../App';
import { getAuth } from 'firebase/auth';
import { equalTo, getDatabase, onValue, orderByChild, push, query, ref, get } from 'firebase/database';

const dateTemplate = "(MM/DD/YYYY)"

function AddUserStoryForm({addUserStory}) {
    const [selectedAMPM, setSelectedAMPM] = useState("");
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDay, setEventDay] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [isEventDayIncorrect, setIsEventDayIncorrect] = useState(false)
    const [isEventTimeIncorrect, setIsEventTimeIncorrect] = useState(false)
    const [pictureOfEvent, setPictureOfEvent] = useState('')


    const navigation = useNavigation()
 
    function validateEntry(){       
        if(!EventTimeIsCorrect(eventTime) && !DayIsCorrect(eventDay)){
            setIsEventDayIncorrect(true)
            setIsEventTimeIncorrect(true)
            return;
        }
        if(!DayIsCorrect(eventDay)){
            setIsEventDayIncorrect(true)
            setIsEventTimeIncorrect(false)
            return;
        }
        if(!EventTimeIsCorrect(eventTime)){
            setIsEventTimeIncorrect(true)
            setIsEventDayIncorrect(false)
            return;
        }
 
        setIsEventDayIncorrect(false)
        setIsEventTimeIncorrect(false)
        changingPagePlusAddingUserStory()
    }

    async function changingPagePlusAddingUserStory() {
        const auth = getAuth();
        const user = auth.currentUser;
        const database = getDatabase()
        
        let fullName = ''
        const usersRef = ref(database, "Users/" + user.uid); //USE this idea for fetching all user stories
        await get(usersRef).then((snapshot) => {
        let currentUserData = snapshot.val();
        //console.log("currentUserData: " + currentUserData)
        for (let key in currentUserData) {
            let temp = currentUserData[key]
            fullName += temp + " "
            }
        }).catch((error) => console.error(error));
        let newEventTime = eventTime + selectedAMPM
        const id = Date.now() + Math.floor(Math.random() * 1000); // generates a unique numerical ID
        let tempNowTime = new Date()
        let nowTime = tempNowTime.toDateString()
        //console.log(typeof(tempNowTime))
        const temp : UserStory = {
            id: id,
            numOfLikes: 0,
            nameOfUser: fullName,
            dayOfEvent: eventDay, 
            timeOfEvent: newEventTime,
            timePostWasMade: nowTime,
            titleOfEvent: eventTitle,
            pictureOfEvent: pictureOfEvent,
            eventDescription: eventDescription,
            userID: user.uid,
        }
        addUserStory(temp)
        writeUserData(temp)
        navigation.navigate('Home')
    }


  const data = [
      {key:'1', value:'AM'},
      {key:'2', value:'PM'}
  ]
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
            <TextInput onChangeText={(text) => setEventDay(text)} style={{borderWidth: 2, borderColor: 'cyan', height: 30, width: "60%"}}></TextInput>
        </View>
        <View>
            {isEventDayIncorrect && <Text style={{color: "red"}}>The time entered is incorrect format {'\n'}Please enter it such that "MM/DD/YYYY"</Text>}
        </View>
        <View style={{marginTop: 5}}>
            <Text style={{fontSize: 25}}>Enter Time Of Event</Text>
            <View style={styles.timeOfEventInputContainer}>
                <TextInput style={{borderWidth: 2, borderColor: 'red', height: 45, width: "60%"}} onChangeText={(text) => setEventTime(text)}></TextInput>
                <SelectList 
                setSelected={(val) => setSelectedAMPM(val)} 
                data={data} 
                save="value"
                />
            </View>
        </View>
        <View>
            <Text>
                {isEventTimeIncorrect && <Text style={{color: "red"}}>The time entered is incorrect {'\n'}Please enter the time correctly</Text>}
            </Text>
        </View>
        <View style={styles.publishButton}>
            <Button onPress={()=>validateEntry()} title="Publish" color="#9CF22F"/>
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

    },
    timeOfEventInputContainer:{
        display: 'flex',
        flexDirection: 'row'
    }
})