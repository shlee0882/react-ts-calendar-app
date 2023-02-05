// import './App.css'
import CalendarComponents from './components/CalendarComponents';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios'
let selectHolidayCnt = Array.from({length: 4}, (_, i) => i + 1).splice(0, 2)
let selectOptionData = Array.from({length: 2100}, (_, i) => i + 1).splice(2019, 81)

const year = new Date().getFullYear().toString();
const items1 = ["0","1", "2", "3"];
const items2 = ["4", "5", "6", "7"];
const items3 = ["8", "9", "10", "11"];

export type RtnArrType = {
  "dateKind": string,
  "dateName": string,
  "isHoliday": string,
  "locdate": number,
  "seq": number
}

const App = () => {
  const [selectHoliday, setSelectHoliday] = useState("2");
  const [selectedOption, setSelectedOption] = useState(year);
  const [holidayArray, setHolidayArray] = useState<Array<RtnArrType>>([]);
  const [holidayRecArray, setHolidayRecArray] = useState([]);
  
  const [data, setData] = useState(null);
  const [error, setError] = useState<null>(null);
 
  const fetchData = async () => {
    try {
      let reqUri = rtnReqUriAppend(selectedOption)
      const response = await axios.get(reqUri);
      let rtnArray = response?.data?.response?.body?.items?.item
      let holidayArray = rtnArray.filter((arr:RtnArrType) => arr.isHoliday == "Y");
      setHolidayArray(holidayArray)
      console.log(holidayArray)
      const arrDayArr:any = recHolidayCalc(holidayArray, selectHoliday)
      setHolidayRecArray(arrDayArr)
    } catch (err) {
      setError(err as null);
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div className="App">
        <p aria-hidden="true" style={{textAlign: "center"}}>
          <Placeholder.Button xs={6} aria-hidden="true">
            직장인 연차 추천 애플리케이션 - 연차 효율적으로 쓰고 여행 가기!<br/>
            연차 사용 추천일이 파란색으로 선택됩니다.
          </Placeholder.Button>
        </p>
        &nbsp;&nbsp;연도: <Form.Select aria-label="Default select example2" onChange={e => {
        setSelectedOption(e.target.value);}}
        value={selectedOption} className='selectBox1'>
        <option>휴가 갈 연도를 선택</option>
        {selectOptionData.map((item:number, index:number) =>(
          <option key={item} value={item}>{item}</option>
        ))}
      </Form.Select>
      사용가능 휴가일수: <Form.Select aria-label="Default select example1" onChange={e => {
        setSelectHoliday(e.target.value);}}
        value={selectHoliday} className='selectBox1'>
        <option>사용가능한 휴가 일수를 선택</option>
        {selectHolidayCnt.map((item:number, index:number) =>(
          <option key={item} value={item}>{item}</option>
        ))}
      </Form.Select>
      <Button variant="success" className='holidaySearch1' onClick={() => {
        fetchData();
      }
      }>휴가 검색!!</Button>
      <div style={{display:'flex', flexWrap: 'nowrap'}}>
        {items1.map((item1:string, index:number) => (
          <CalendarComponents key={index} year={selectedOption} month={item1} holidayArray={holidayArray} holidayRecArray={holidayRecArray} selectHoliday={selectHoliday}></CalendarComponents>
        ))}
      </div>
      <div style={{display:'flex', flexWrap: 'nowrap'}}>
        {items2.map((item2:string, index:number) => (
          <CalendarComponents key={index} year={selectedOption} month={item2} holidayArray={holidayArray} holidayRecArray={holidayRecArray} selectHoliday={selectHoliday}></CalendarComponents>
        ))}
      </div>
      <div style={{display:'flex', flexWrap: 'nowrap'}}>
        {items3.map((item3:string, index:number) => (
          <CalendarComponents key={index} year={selectedOption} month={item3} holidayArray={holidayArray} holidayRecArray={holidayRecArray} selectHoliday={selectHoliday}></CalendarComponents>
        ))}
      </div>
    </div>
  )
}

const rtnReqUriAppend = (year: string) => {
  let apiBaseUrl = 'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?';
  let solYear = 'solYear='+year;
  let serviceKey = '&ServiceKey='+'429e9l%2BRPBvvMYSqI0TIu0JgvFl1vio2dcUfXj7d66%2F%2B2glco1EDs1HDHJBssw9U7HAt1A11Cy6N0Hbk2INDfQ%3D%3D';
  let type = '&_type=json';
  let numOfRows = '&numOfRows=100';
  let pubHoliReqUri = apiBaseUrl+solYear+serviceKey+type+numOfRows
  return pubHoliReqUri
}

const searchHoliday = async (selectYear:string) => {
  let reqUri = rtnReqUriAppend(selectYear)
  // let rtnArray:Array<RtnArrType> | undefined = undefined;
  let holidayArray:Array<RtnArrType> = []
  try{
    const response = await axios.get(reqUri,{timeout: 1000})
    console.log('응답값: ', response)
    let rtnArray = response?.data?.response?.body?.items?.item
    holidayArray = rtnArray.filter((arr:RtnArrType) => arr.isHoliday == "Y");
    console.log(holidayArray)
  }catch(e){
    console.log(e)
  }
  return holidayArray
}

const recHolidayCalc = (holidayArray: Array<RtnArrType>, selectHoliday:string) => {
  let arrDayArr = [];
  let availDayArr1: any = [];
  holidayArray.map((item:RtnArrType, index:number) =>{
    let itemStr = item.locdate.toString()
    const date = moment(itemStr, 'YYYYMMDD');
    const dayOfWeek = date.format('dddd');
    
    if(dayOfWeek != 'Saturday' && dayOfWeek != 'Sunday') {
      if(dayOfWeek == 'Monday' || dayOfWeek == 'Wednesday'){
        let pushCnt = 0;
        for(var i=0; i<7; i++){
          let val = 1;
          let dateAdd1 = date.add(val, 'days')
          let dayOfWeekAdd1 = dateAdd1.format('dddd');
          if(dayOfWeekAdd1 != 'Saturday' && dayOfWeekAdd1 != 'Sunday'){
            if(holidayArray.filter((a) => a.locdate.toString() == dateAdd1.format('YYYYMMDD')).length < 1){
              pushCnt++;
              availDayArr1.push(dateAdd1.format('YYYYMMDD'))
              if(Number(selectHoliday) == pushCnt){
                break;
              }
            }
          }
        }
      }
      if(dayOfWeek == 'Tuesday' || dayOfWeek == 'Thursday'){
        let pushCnt = 0;
        for(var i=0; i<7; i++){
          let val = 1;
          let dateAdd1: any;
          if(i == 0) dateAdd1 = date.subtract(val, 'days')
          else dateAdd1 = date.add(val, 'days')
          let dayOfWeekAdd1 = dateAdd1.format('dddd');
          if(dayOfWeekAdd1 != 'Saturday' && dayOfWeekAdd1 != 'Sunday'){
            if(holidayArray.filter((a) => a.locdate.toString() == dateAdd1.format('YYYYMMDD')).length < 1){
              pushCnt++;
              availDayArr1.push(dateAdd1.format('YYYYMMDD'))
              if(Number(selectHoliday) == pushCnt){
                break;
              }
            }
          }
        }
      }
      if(dayOfWeek == 'Friday'){ // 금
        let pushCnt = 0;
        for(var i=0; i<7; i++){
          let val = 1;
          let dateAdd1 = date.subtract(val, 'days')
          let dayOfWeekAdd1 = dateAdd1.format('dddd');
          if(dayOfWeekAdd1 != 'Saturday' && dayOfWeekAdd1 != 'Sunday'){
            if(holidayArray.filter((a) => a.locdate.toString() == dateAdd1.format('YYYYMMDD')).length < 1){
              pushCnt++;
              availDayArr1.push(dateAdd1.format('YYYYMMDD'))
              if(Number(selectHoliday) == pushCnt){
                break;
              }
            }
          }
        }
      }
    }
  })
  arrDayArr.push(availDayArr1)
  return arrDayArr
}

export default App
