import { Float } from "react-native/Libraries/Types/CodegenTypes";

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

export interface LatLong {
    latitude: Float,
    longitude: Float,
}