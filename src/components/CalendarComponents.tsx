import React, {useState} from "react";
import moment from 'moment';
import Calendar, { Detail } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TitleContent from '../pages/TitleContent';
import { RtnArrType } from "../App";

export type DateType = {
  year: string,
  month: string,
  holidayArray: Array<RtnArrType>
  holidayRecArray: any,
  selectHoliday: string
}

let weekCnt = 0;

const CalendarComponents = (dateType: DateType) => {
  const [value, onChange] = useState(new Date());
  return (
    <Calendar onChange={onChange} 
    className={["box"]}
    view="month"
    onClickMonth={(value, event) => (
      event.preventDefault(),
      event.stopPropagation()
    )}
    onClickDay={(value, event) => (
      event.preventDefault(),
      event.stopPropagation()
    )}
    defaultValue={[new Date(Number(dateType.year), Number(dateType.month))]}
    tileContent={({ activeStartDate, date, view }) => view === 'month'? <TitleContent activeStartDate={activeStartDate} date={date} holidayArray={dateType.holidayArray}/> : null}
    tileClassName={({activeStartDate, date, view }) => changeColorDate(activeStartDate, date, view, dateType)}
    calendarType="US" 
    formatDay={(locale, date) => moment(date).format("D")} />
  )
}

const changeColorDate = (activeStartDate:Date, date: Date, view: Detail, dateType: DateType) => {
  // 월이 달라지면
  let isBlueSat: boolean = true
  let cusClssStr:any = []
  if(moment(date).format("MM") != moment(activeStartDate).format("MM")){
    isBlueSat = false
  }
  // 우리나라 기준 공휴일 색깔 바꾸기
  if(dateType.holidayArray.filter(a => moment(date).format("Y-MM-DD") == moment(a.locdate.toString()).format("Y-MM-DD")).length > 0 && isBlueSat){
    cusClssStr.push('color-red')
  }

  if(dateType.holidayRecArray.length > 0){
    let recArr = dateType.holidayRecArray[0]
    if(recArr.filter((obj: any) => moment(date).format("Y-MM-DD")  == moment(obj).format("Y-MM-DD")).length > 0 && isBlueSat){      
      cusClssStr.push('color-bg-yellow') 
      return cusClssStr
    };
  }


  if(view === 'month' && date.getDay() === 6 && isBlueSat){
    cusClssStr.push('color-blue') 
    return cusClssStr
  }
  return cusClssStr
}

export default CalendarComponents
