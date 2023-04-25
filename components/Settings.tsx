import { useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, update } from 'firebase/database'
import React, { useState } from 'react'
import {View, Text, TextInput, Button} from 'react-native'

function Settings() {
  const [distancePreference, setDistancePreference] = useState(0)
  const [distancePreferenceError, setDistancePreferenceError] = useState(false)
  let navigation = useNavigation()
  async function validateEntry(){
    if(isNaN(distancePreference)){
      setDistancePreferenceError(true)
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    setDistancePreferenceError(false)

    
    let usersRef = ref(getDatabase(), 'Users/' + user.uid)
    await update(usersRef, {
      distancePreference: distancePreference
    }).catch((error) => { console.error(error) })
    navigation.navigate('Home')
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