import { Float } from "react-native/Libraries/Types/CodegenTypes";

//This is what we're using to interact with FireBase to store user story information
export interface UserStory{
    id: number,
    numOfLikes: number,
    userID: string,
    nameOfUser: string,
    dayOfEvent: string,
    timeOfEvent: string,
    timePostWasMade: string,
    titleOfEvent: string,
    pictureOfEvent: string,
    eventDescription: string,
    address: string,
}

//Stores coordinate information to firebase
export interface LatLong {
    latitude: Float,
    longitude: Float,
}