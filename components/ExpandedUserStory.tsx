import { getDatabase, ref, runTransaction } from 'firebase/database';
import React, { useState } from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
function ExpandedUserStory({route}) {
  //added id and numOfLikes to the parameter list and passed them from HomePage.tsx in the onPress()
  const {nameOfUser, timeOfEvent, timePostWasMade, titleOfEvent, eventDescription, numOfLikes, id} = route.params
  const [liked, setLiked] = useState(false);
  const database = getDatabase();


  return (
    <View style={styles.expandedUserStoryPageContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{fontSize: 30}}> @{nameOfUser}</Text>
        </View>
        <View style={styles.picStyle}>
          <Image source={require('../Utils/Imgs/Party.webp')} style={styles.picStyle}/>
        </View>
        
        <TouchableOpacity
          style={[styles.likeButton, { backgroundColor: liked ? 'red' : 'white' }]}
          onPress={() => {
            setLiked(!liked);
            const db = getDatabase();
            const storyRef = ref(db, `UserStories/${id}/numOfLikes`);

            //a story with no likes may have value -1 instead of zero
            //the code needs a way of knowing if a logged in user has liked a specific story or not  
            runTransaction(storyRef, (currentValue) => {
              return liked ? currentValue - 1 : currentValue + 1;
            }).then(() => {
              console.log('Transaction completed successfully!');
            }).catch((error) => {
              console.error('Transaction failed: ', error);
            });
          }}
        >
          <Text style={[styles.likeButtonText, { color: liked ? 'white' : 'black' }]}>
            {liked ? 'Unlike' : 'Like'}
          </Text>
        </TouchableOpacity>

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
  likeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  likeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },


})
export default ExpandedUserStory