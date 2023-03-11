import React from 'react'
import {View , Image , StyleSheet, TouchableOpacity} from 'react-native'


function AddUserStoryButton({navigation, changeScreen}) {
  function changeScree(){
    changeScreen()
  }
  return (
    <View>
        <TouchableOpacity onPress={()=> changeScree()}>
            <Image style={{height: 60, width: 60, borderRadius: 100}} source={require('../Utils/Imgs/AddStory.png')}></Image>
        </TouchableOpacity>
    </View>
  )
}

export default AddUserStoryButton
