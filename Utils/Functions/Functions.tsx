import { UserStory } from "../Interfaces/Interfaces"

export  function seePassword(password){
    alert(password)
}

// App Functions
export function isNumber(char: string){
    return /^\d+$/.test(char);
}

const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const isValidDay = (day: number, month: number, year: number): boolean => 
  {
    const daysInMonth = [ 31,isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, ];
    return day >= 1 && day <= daysInMonth[month - 1];
};

function IsBetween1And12(num: number){
    if(num < 1 || num > 12)
        return false
    return true
}

//function IsBeforeCurrentDay(){
//    let currDay = Date()
//}

//checks formatting, valid date inputs, has a future date
export const TimeIsCorrect = (eventTime: string, eventHour:string) =>{
    if(eventTime.length !== 10)
        return false
    else if(!isNumber(eventTime.substring(0,2)) || !IsBetween1And12(parseInt(eventTime.substring(0,2))))//if month is not a number or btw 1-12
        return false
    else if(eventTime[2] !== '/')
        return false
    else if(!isNumber(eventTime.substring(3,5)) )//day
        return false
    else if(eventTime[5] !== '/')
        return false
    else if(!isNumber(eventTime.substring(6,10)))//year
        return false
    
    //Checks for valid month and day values
    else if(!EventTimeIsCorrect(eventHour)) return false
    
    const month:number=parseInt(eventTime.substring(0,2))
    const day : number=parseInt(eventTime.substring(3,5))
    const year:number=parseInt(eventTime.substring(6,10))

    if(!isValidDay(day, month, year)) return false

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    currentDate.setHours(0,0,0,0)
    //if(eventHour.length === 5) currentDate.setHours(parseInt(eventHour.substring(0,2)), parseInt(eventHour.substring(3,5)), 0, 0); //Reset hours, minutes, seconds, and milliseconds
    //else currentDate.setHours(parseInt(eventHour.substring(0)), parseInt(eventHour.substring(2,4)), 0, 0);

    return inputDate.getTime() > currentDate.getTime();//checks for future time
   
}

export const EventTimeIsCorrect = (eventTime: string) =>{
    if(eventTime.length === 5){
        if(!isNumber(eventTime.substring(0,2)))
            return false
        else if(eventTime[2] !== ':')
            return false
        else if(!isNumber(eventTime.substring(3,5)))
            return false

        //checks for valid times
        const hour:number=parseInt(eventTime.substring(0,2))
        const minute:number=parseInt(eventTime.substring(3,5))

        if(hour<0 || hour>12) return false
        if(minute<0 || minute>59) return false

    }
    else if( eventTime.length === 4){
        if(!isNumber(eventTime[0]))
            return false
        else if(eventTime[1] !== ':')
            return false
        else if(!isNumber(eventTime.substring(2,4)))
            return false
            
        const hour:number=parseInt(eventTime.substring(0))
        const minute:number=parseInt(eventTime.substring(2,4))
        if(minute<0 || minute>59) return false
    }
    else return false
    
}

// AddUserStoryForm functions