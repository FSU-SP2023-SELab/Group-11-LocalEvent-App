import { UserStory } from "../Interfaces/Interfaces"

export  function seePassword(password) {
    alert(password)
}

// Checks if input string is a number
export function isNumber(char: string) {
    return /^\d+$/.test(char);
}


/*
Below are the date validation funcitons for AddUserStoryForms
*/

//Checks if the year as an integer is a leap year, used in isValidDay
const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  //Used to check for valid day in dayIsCorrect
  const isValidDay = (day: number, month: number, year: number): boolean => 
  {
    const daysInMonth = [ 31,isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, ];
    return day >= 1 && day <= daysInMonth[month - 1];
};

//Checks if a number is between 1 and 12, used to check months in DayIsCorrect
function IsBetween1And12(num: number) {
    if(num < 1 || num > 12)
        return false
    return true
}


//Checks an input string for correct formatting and valid date
export const DayIsCorrect = (eventTime: string) => {
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
        
    else {
        const month:number=parseInt(eventTime.substring(0,2))
        const day : number=parseInt(eventTime.substring(3,5))
        const year:number=parseInt(eventTime.substring(6,10))
    
        if(!isValidDay(day, month, year)) return false
    
        return true;
    }
}

//Checks for a valid time input format
export const EventTimeIsCorrect = (eventTime: string) => {
    if(eventTime.length === 5) {
        if(!isNumber(eventTime.substring(0,2)))
            return false
        else if(eventTime[2] !== ':')
            return false
        else if(!isNumber(eventTime.substring(3,5)))
            return false
        else{
            const hour:number=parseInt(eventTime.substring(0,2))
            const minute:number=parseInt(eventTime.substring(3,5))

            if(hour<0 || hour>12) return false
            if(minute<0 || minute>59) return false

            return true
        }

        //checks for valid times
        

    }
    else if( eventTime.length === 4) {
        if(!isNumber(eventTime[0])) {
            console.log("First Number is problem")
            return false
        }
        else if(eventTime[1] !== ':') {
            console.log(": is problem")
            return false
        }
            
        else if(!isNumber(eventTime.substring(2,4))) {
            console.log("Last Two Numbers are problem") 
            return false
        }
        else {
            const hour:number=parseInt(eventTime[0])
            const minute:number=parseInt(eventTime.substring(2,4))
        
            if(hour<=0) {
                console.log(hour)
                console.log("hour is negative or wrong")
                return false 
            }
            if(minute<0 || minute>59) {
                console.log("Minute is not between 0 and 59") 
                return false
            } 

            return true
        }
        
        
    }
    else return false
}

//Verifies that the date input is in the future
export const isFutureTime = (eventDay:string)=> {
    const month:number=parseInt(eventDay.substring(0,2))
    const day : number=parseInt(eventDay.substring(3,5))
    const year:number=parseInt(eventDay.substring(6,10))

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    currentDate.setHours(0,0,0,0)

    return inputDate.getTime() >= currentDate.getTime();//checks for future time
}

// AddUserStoryForm functions