import React, { useState } from 'react'
import {View, Text, TextInput, Button} from 'react-native'

function Settings() {
  const [distancePreference, setDistancePreference] = useState(0)
  const [distancePreferenceError, setDistancePreferenceError] = useState(false)

  function validateEntry(){
    if(isNaN(distancePreference)){
      setDistancePreferenceError(true)
      return;
    }
    setDistancePreferenceError(false)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Change the distance of visible events {"\(in miles\)"}</Text>
        <TextInput onChangeText={(text)=> setDistancePreference(parseInt(text, 10))} style={{borderColor: "gray", borderWidth: 1, width: "60%"}}></TextInput>
        {distancePreferenceError && <Text style={{color: "red"}}>Please enter a number</Text>}
        <Button onPress={()=> validateEntry()} title="submit"></Button>
    </View>
  )
}

export default Settings