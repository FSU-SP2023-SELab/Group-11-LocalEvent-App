import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from "../Utils/Styles/StartingPageStyle"
export default function StartPage({navigation}) {
  return (
    <View>
         <View style={styles.navBar}> 
    <Text style={styles.navBarText}>Adventure Time</Text>
  </View>
        <View>
        <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate('Register')} title='Go to register page' color='blue'></Button>
            <Button onPress={() => navigation.navigate('Login')} title='Go to login page' ></Button>
            <Button onPress={() => navigation.navigate('Home')} title = 'Home Page'></Button>
        </View>
        
        </View>
  </View>
   
  )
}

// export namespace KustoQueryService {
//   export const getKustoQueryResults = async (msalContext: IMsalContext, transactionId: string) => {
//     let accessToken = await SignInService.requestAccessToken(msalContext)
//     let headers: AxiosRequestHeaders = { Authorization: `Bearer ${accessToken}` };
//     let params = { transactionId };
//     let response = await axios.get(`${webServerConfig.baseUrl}/api/kustoquery`, { headers, params });
//     return response.data;
//   }
// }

// async function FetchData( TransactionId:string ) {
//   setIsLoading(true);
//   const results: ArrowList = await KustoQueryService.getKustoQueryResults(msalContext, TransactionId)
//   setOriginalArrowList(results.arrowList)
//   setArrowList(results.arrowList)
//   setIsLoading(false);
// }