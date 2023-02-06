import React, { CSSProperties } from "react";
import { RtnArrType } from "../App";
import moment from 'moment';

export type TitleDataType = {
  activeStartDate: Date,
  date: Date,
  holidayArray: Array<RtnArrType>
}


const TitleContent = (titleDataType: TitleDataType) => {
  let holidayInfo: string = ''
  let content: any
  // 월이 달라지면
  let isBlueSat: boolean = true
  if(moment(titleDataType.date).format("MM") != moment(titleDataType.activeStartDate).format("MM")){
    isBlueSat = false
  }
  const dataArr = titleDataType.holidayArray.filter(a => moment(titleDataType.date).format("Y-MM-DD") == moment(a.locdate.toString()).format("Y-MM-DD"));
  if(dataArr.length > 0 && isBlueSat){
    content = <span style={{color: "green", fontSize: "0.8em"}}> {dataArr[0].dateName} </span>
  }

  return (
    <div className="ellipsis" style={{width: "100%", height: "50px"}}>
      {content}
    </div>
  )
}

export default TitleContent
