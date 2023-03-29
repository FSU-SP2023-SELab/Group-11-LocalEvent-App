import { UserStory } from "../Interfaces/Interfaces"

export  function seePassword(password){
    alert(password)
}

// App Functions
export function isNumber(char: string){
    return /^\d+$/.test(char);
}
function IsBetween1And12(num: number){
    if(num < 1 || num > 12)
        return false
    return true
}
function IsBetween1And31(num: number ){
  if (eventTime.substring)
}
function IsBeforeCurrentDay(){
    let currDay = Date()

}

export const TimeIsCorrect = (eventTime: string) =>{
    if(eventTime.length !== 10)
        return false
    else if(!isNumber(eventTime.substring(0,2)) || !IsBetween1And12(parseInt(eventTime.substring(0,2))))//month
        return false
    else if(eventTime[2] !== '/')
        return false
    else if(!isNumber(eventTime.substring(3,5)) )//day
        return false
    else if(eventTime[5] !== '/')
        return false
    else if(!isNumber(eventTime.substring(6,10)))//year
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