import { get, getDatabase, ref, set } from "firebase/database";
import { UserStory } from "../Interfaces/Interfaces";

//for writing to the database
const database = getDatabase();

export function writeUserData(story: UserStory) {
    set(ref(database, 'UserStories/' + story.id), {
      id: story.id,
      nameOfUser: story.nameOfUser,
      timeOfEvent: story.timeOfEvent.toString(),
      timePostWasMade: story.timePostWasMade.toString(),
      titleOfEvent: story.titleOfEvent,
      pictureOfEvent: story.pictureOfEvent,
      eventDescription: story.eventDescription,
      userID: story.userID,
    });
  }

//   export async function fetchAllStories () {
//     const usersRef = ref(database, "UserStories/"); //USE this idea for fetching all user stories
//     await get(usersRef).then((snapshot) => {
//     let currentStoryData = snapshot.val();
//     console.log("currentUserData: " + currentStoryData);
//     // for (let key in currentStoryData) {
//     //     let temp = currentStoryData[key]
//     //     }
//     // }).catch((error) => {
//     //     console.error(error);
//     //     });
//   })}


//from inside app() {}
// let tempArr : UserStory[]
//   async function fetchAllStories () {
//     const usersRef = ref(database, "UserStories/"); //USE this idea for fetching all user stories
//     await get(usersRef).then((snapshot) => {
//     let currentStoryData = snapshot.val().toJSON(); 
//     console.log(currentStoryData)
//     for (let key in currentStoryData) {
//         let temp = currentStoryData[key]
//         // let myTemp = temp.toJSON()
//         // console.log(temp)
//         // tempArr.push(temp)
//         }
//     }).catch((error) => {
//         console.error(error);
//         });
//   }