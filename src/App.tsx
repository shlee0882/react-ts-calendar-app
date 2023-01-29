import { useState } from 'react'
// import './App.css'

import PropTypes from 'prop-types';
import Calendar, { Detail } from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import TitleContent from './pages/TitleContent';

let weekCnt = 0;

const App = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="App">
      <Calendar onChange={onChange} 
        className={["div-center"]}
        tileContent={({ activeStartDate, date, view }) => view === 'month'? <TitleContent /> : null}
        tileClassName={({activeStartDate, date, view }) => changeColorDate(activeStartDate, date, view)}
        // selectRange={true} 
        calendarType="US" 
        formatDay={(locale, date) => moment(date).format("D")} />
    </div>
  )
}

const changeColorDate = (activeStartDate:Date, date: Date, view: Detail) => {
  // 설날 {localDate : 20230124}
  // 우리나라 기준 공휴일 색깔 바꾸기
  let isRedSun: boolean = false
  if(moment(date).format("Y-MM-DD") === moment("20230124").format("Y-MM-DD") ){
    console.log('체크')
    return 'color-red'
  }

  // 월이 달라지면
  let isBlueSat: boolean = true
  if(moment(date).format("MM") != moment(activeStartDate).format("MM")){
    isBlueSat = false
  }

  if(view === 'month' && date.getDay() === 6){
    console.log(weekCnt, isBlueSat)
    console.log(moment(date).format("Y-MM-DD"))
  }

  if(view === 'month' && date.getDay() === 6 && isBlueSat){
    return 'color-blue'
  }else{
    return null
  } 
}

export default App
