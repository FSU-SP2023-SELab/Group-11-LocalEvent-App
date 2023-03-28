import { getDatabase, ref, set } from "firebase/database";
import { UserStory } from "../Interfaces/Interfaces";

//for writing to the database
export function writeUserData(story: UserStory) {
    const db = getDatabase(); //need to have "app" which can only be done in App.tsx
    set(ref(db, 'users/' + story.id), {
      nameOfUser: story.nameOfUser,
      timeOfEvent: story.timeOfEvent.toString(),
      timePostWasMade: story.timePostWasMade.toString(),
      titleOfEvent: story.titleOfEvent,
      pictureOfEvent: story.pictureOfEvent,
      eventDescription: story.eventDescription,
    });
  }