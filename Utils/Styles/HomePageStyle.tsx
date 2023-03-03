import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    userStoryContainer:{
        flex: 1,
        flexDirection: 'column',
        borderColor: 'blue',
        height: 120,
        width: "100%",
        borderWidth: 1
    },
    picTitleLikeContainer:{
        flex: 1,
        flexDirection: "row",
        height: 80,
        width: "100%",
        borderColor: 'green',
        borderWidth: 1
    },
    picStyle:{
        height: "100%",
        width: 85
    },
    informationAboutEventContainer:{
        flex: 1,
        flexDirection: 'column',
        height: "100%",
        width:"100%",
    },
    nameOfEventAndLikeButtonContainer:{
        flex:1,
        flexDirection: 'row',
        height: 100,
        width: '100%',
        paddingTop: 8,
        justifyContent: 'space-between'
    },
    timeOfEventAndTimePostedContainer:
    {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default styles