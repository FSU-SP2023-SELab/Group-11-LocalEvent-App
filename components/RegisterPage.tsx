//might need to use useRef, but may need useEffect to make useRef work 
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/RegisterPageStyle"
import HomePage from './components/HomePage';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage({navigation}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_reenter, setPasswordReenter] = useState('')
  const [isNewUser, setNewUser] = useState(true)
  const [isSamePassword, setSamePasswords] = useState(true)

  const handleNewUser = () => {
    if (password !== password_reenter) {
      setSamePasswords(false)
    }
    else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setNewUser(true)
        returnToHomePage()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
        setNewUser(false)
      });
    }
  }
    const handleIsSamePassword = () => { setSamePasswords(!isSamePassword) }

    function returnToHomePage() {
      navigation.navigate('HomePage')
    }
    

  return (
    <View style={styles.container}>
        <View style={styles.miniContainer}>
        <Text>First Name</Text>
        <TextInput style={styles.input} onChangeText={(newText) => setFirstName(newText)} />
        <Text>Last Name</Text>
        <TextInput style={styles.input} onChangeText={(newText) => setLastName(newText)} />
        <Text>Email</Text>
        <TextInput style={styles.input} onChangeText={(newText) => setEmail(newText)} />
        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={(newText) => setPassword(newText)} />
        <Text>Re-Enter Password</Text>
        <TextInput style={styles.input} onChangeText={(newText) => setPasswordReenter(newText)} />
        </View>
        {
        // !isSamePassword && <View>
        //   <Text> You entered the wrong password for the re-entry of password </Text>
        // </View>
        }
        {
          // !isNewUser && <View>
          //   <Text>User Is already in the Database, Go login silly?</Text>
          // </View>
        }
        
        {/* { use conditional rendering . set to true initially } */}
        {/* <Button onPress={() => handleIsSamePassword()} title="Ref Button"></Button> */}        
        {/* <Button onPress={()=> navigation.navigate('Home')} title='Go to Home'></Button> */}
        <Button onPress={() => handleNewUser()} title='Sign Up' ></Button>
    </View>
  )
}
