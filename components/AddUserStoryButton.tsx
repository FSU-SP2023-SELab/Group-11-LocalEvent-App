import React from 'react'
import {View , Image , StyleSheet, TouchableOpacity} from 'react-native'


function AddUserStoryButton() {
  return (
    <View>
        <TouchableOpacity>
            <Image style={{height: 60, width: 60, borderRadius: 100}} source={require('../Utils/Imgs/AddStory.png')}></Image>
        </TouchableOpacity>
    </View>
  )
}

export default AddUserStoryButton
