import React from 'react'
import {View,Text, StyleSheet, Image} from 'react-native'
function ExpandedUserStory({route}) {
const {nameOfUser, timeOfEvent, timePostWasMade, titleOfEvent, eventDescription} = route.params

  return (
    <View style={styles.expandedUserStoryPageContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{fontSize: 30}}> @{nameOfUser}</Text>
        </View>
        <View style={styles.picStyle}>
          <Image source={require('../Utils/Imgs/Party.webp')} style={styles.picStyle}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={{fontSize: 40}}>{titleOfEvent}</Text>
          <Text>{timeOfEvent}</Text>
        </View>
        <View>
          <Text>
            {eventDescription}
          </Text>
        </View>
    </View>
  )
}
const styles= StyleSheet.create({
  expandedUserStoryPageContainer:{
    height:"100%",
    width: "100%",
  },
  topTextContainer:{
    maxWidth: "90%",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    left: '5%',
    right: '5%',
  },
  picStyle:{
    maxHeight: "60%",
    minHeight: "60%",
    maxWidth: "100%",
    marginBottom: -200
  },
  titleContainer:{
    display: 'flex',
    width: "100%",
    height: '10%',
  },


})
export default ExpandedUserStory