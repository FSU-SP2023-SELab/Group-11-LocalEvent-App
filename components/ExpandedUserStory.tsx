import { DrawerContentScrollView } from '@react-navigation/drawer';
import { getAuth } from 'firebase/auth';
import { child, get, getDatabase, onValue, orderByChild, ref, runTransaction, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ExpandedUserStory({route, RefreshPage}) {
  //added id and numOfLikes to the parameter list and passed them from HomePage.tsx in the onPress()
  const {address, dayOfEvent, nameOfUser, timeOfEvent, timePostWasMade, titleOfEvent, eventDescription, numOfLikes, id} = route.params
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const storyRef = ref(db, "UserStories/" + id + "/numOfLikes");
  const likedStoriesRef = ref(db, "Users/" + user.uid +"/LikedStories");

  const [liked, setLiked] = useState(false);
  // Listen for changes in the `liked` state and update `initialLikeValue` accordingly
  
  const fetchLikeValue = async () => {
    await get(likedStoriesRef).then((snapshot) => {
      let currentLikedData = snapshot.val();
      if (currentLikedData[id] === true) { //the key is the post ID 
        setLiked(true)
        // console.log(currentLikedData[id])
        // console.log(id)
      }
    }).then(() => {
      console.log('Database read succesful');
    }).catch((error) => {
      console.error('Transaction failed: ', error);
    });
  }

  fetchLikeValue();
  
  const handleLike = async () => {
    // adding 1 or subtracting 1 based on like value
    await runTransaction(storyRef, (currentValue) => {
      if ( currentValue > 0 )
        return liked ? currentValue - 1 : currentValue + 1;
      else 
        return liked ? currentValue : currentValue + 1;
    }).then(() => {
      console.log('HandleLike ran succesfully');
      
      // Update the user's liked stories if necessary
      if (!liked) 
        update(likedStoriesRef, { [id]: true });
      else 
        update(likedStoriesRef, { [id]: false }); //should just remove it instead 

      // Update the liked state based on the new value
      setLiked(!liked);
      RefreshPage()
    }).catch((error) => {
      console.error('HandleLike did NOT run succesfully: ', error);
    });
  };

  return (
    <View style={styles.expandedUserStoryPageContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{fontSize: 30}}> @{nameOfUser}</Text>
        </View>
        <View style={styles.picStyle}>
          <Image source={require('../Utils/Imgs/Party.webp')} style={styles.picStyle}/>
        </View>
        
        <TouchableOpacity
        style={styles.likeButton}
        onPress={() => { handleLike() }} //added handle like because that is what alters the database
        activeOpacity={0.6}
        >
        <FontAwesomeIcon
        icon={faHeart}
        size={24}
        color={liked ? 'red' : 'lightgray'}
        />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={{fontSize: 40}}>{titleOfEvent}</Text>
          <Text>{timeOfEvent}</Text>
        </View>
        <View>
          <Text style={{fontSize: 18}}> Date: </Text>
          <Text> {dayOfEvent}</Text>
        </View>
        <View>
          <Text style={{fontSize: 18}}> Address:  </Text>
          <Text> {address}</Text>
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
    padding: 8,
  },
  likeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },


})
export default ExpandedUserStory