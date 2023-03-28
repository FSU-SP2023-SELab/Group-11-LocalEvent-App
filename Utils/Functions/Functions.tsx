import { UserStory } from "../Interfaces/Interfaces"

export  function seePassword(password){
    alert(password)
}

// App Functions
export const setTemplateUserStories = () =>{
    const listOfUsers : string[] = ['John', 'Wilfredo', 'Juan', 'Mark']
    const listOfTitles : string[] = ['Lets Party', 'Getting Dirty', 'Water Fiasco', 'Baking with Becky']
    const listOfDates : Date[] = [new Date("9/11/2001"), new Date("04/02/2023"), new Date('10/12/2020'), new Date()]
    const listOfPics: string[] = ['../Utils/Imgs/Party.webp', '../Utils/Imgs/Party2.jpeg']
    const listOfUserStoriesData : UserStory[] = []


    for(var i = 0; i < 10; i++) {
        const temp : UserStory = {
            id: i,
            nameOfUser : listOfUsers[Math.floor(Math.random() *4)],
            timeOfEvent: listOfDates[Math.floor(Math.random() *4)],
            timePostWasMade: listOfDates[Math.floor(Math.random() *4)],
            titleOfEvent: listOfTitles[Math.floor(Math.random() *4)],
            pictureOfEvent: listOfPics[Math.floor(Math.random() *2)],
            eventDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem non praesentium aliquid adipisci. Laboriosam eum, maiores ullam quisquam rerum perferendis debitis tempora fuga natus, molestiae deserunt possimus sunt modi unde!"
        }
        listOfUserStoriesData.push(temp)  // Starter Entries 
    }
    return listOfUserStoriesData
}

export function isNumber(char: string){
    return /^\d+$/.test(char);
}
function IsBetween1And12(num: number){
    if(num < 1 || num > 12)
        return false
    return true
}
// function IsBetween1And31(num: )
function IsBeforeCurrentDay(){
    let currDay = Date()

}

export const TimeIsCorrect = (eventTime: string) =>{
    if(eventTime.length !== 10)
        return false
    else if(!isNumber(eventTime.substring(0,2)) || !IsBetween1And12(parseInt(eventTime.substring(0,2))))
        return false
    else if(eventTime[2] !== '/')
        return false
    else if(!isNumber(eventTime.substring(3,5)) || !IsBetween1And12(parseInt(eventTime.substring(3,5))))
        return false
    else if(eventTime[5] !== '/')
        return false
    else if(!isNumber(eventTime.substring(6,10)))
        return false
    else
        return true
}
export const EventTimeIsCorrect = (eventTime: string) =>{
    if(eventTime.length === 5){
        if(!isNumber(eventTime.substring(0,2)))
            return false
        else if(eventTime[2] !== ':')
            return false
        else if(!isNumber(eventTime.substring(3,5)))
            return false
        else
            return true
    }
    else if( eventTime.length === 4){
        if(!isNumber(eventTime[0]))
            return false
        else if(eventTime[1] !== ':')
            return false
        else if(!isNumber(eventTime.substring(2,4)))
            return false
        else
            return true
    }
    else{
        return false
    }
}

// AddUserStoryForm functions