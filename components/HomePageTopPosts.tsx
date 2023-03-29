import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../Utils/Styles/HomePageStyle'
function HomePageTopPosts({listOfAllUserStories}) {

    const navigation =  useNavigation()
    let myList = listOfAllUserStories
    myList.sort((p1,p2) => p1.id < p2.id ? 1 : p1.id > p2.id ? -1 : 0 )
    let listOfUserStories: JSX.Element[] = myList.map((d, i) => {
        
    
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
              <Text style={{}}>Likes: {d.id}</Text>
        </View>
    </View>
  </TouchableOpacity> 
)})
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>
    //         This is where the top posts of the week will go
    //     </Text>
    // </View>
    <ScrollView>
      {listOfUserStories}
    </ScrollView>
  )
}

export default HomePageTopPosts