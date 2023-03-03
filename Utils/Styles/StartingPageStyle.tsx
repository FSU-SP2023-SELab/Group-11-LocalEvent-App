import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBar: {
      height: 80,
      position: 'relative',
      top: 0,
      right: 0,
      width: '100%',
      backgroundColor: '#5a65db',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: 'green'
    },
    navBarText:{
      marginTop: 15,
      fontSize: 40,
      color: 'white'
    },
    buttonContainer:{
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 500

    }
  });
  export default styles