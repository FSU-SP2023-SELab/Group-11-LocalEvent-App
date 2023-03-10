import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
function ExpandedUserStory({route}) {
const {nameOfUser, timeOfEvent, timePostWasMade, titleOfEvent} = route.params


  return (
    <View style={styles.expandedUserStoryPageContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{fontSize: 30}}> @{nameOfUser}</Text>
        </View>
       <Text> This is the screen after you touched a UserStory!</Text> 
       <Text>{nameOfUser}</Text>
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
  }

})
export default ExpandedUserStory