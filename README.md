<br>

## 개요

ReactJs, TypeScript, Vite를 사용해 만든 프로젝트이며<br>
적은 휴가일수를 가지고<br>
휴가를 효율적으로 사용할 수 있게<br> 
추천해주는 [휴가 추천 토이 프로젝트] 입니다.
<br>
<br>

## 사용 방법

- 연도와 사용가능한 휴가를 선택합니다.
- 토요일, 일요일, 법정공휴일, 대체공휴일 (공공 API 데이터 활용 )을 가져옵니다. 
- 검색하면 휴일을 포함해 최대한 긴 휴가를 갈수 있게 
  연차사용 추천날짜를 표시해줍니다. 
- 휴가는 최대 2일까지 선택가능합니다.
<br>

## 기능 요약

- 공휴일 정보 제공 및 휴가 추천조회 기능

![조회기능](/src/assets/gif/ts_rec_holiday.gif)

## 사용 기술

- vite, typescript
- react, react-bootstrap, react-calendar, momentjs, use[State, Effect], axios
- 공공 공휴일 정보 API

<br>

## 배포된 Deploy URL

https://shlee0882.github.io/react-ts-calendar-app/

<br>

## 실행 하기
```
npm install
npm run dev
```
<br>

## 레퍼런스

- https://www.npmjs.com/package/react-calendar
- https://www.data.go.kr/data/15012690/openapi.do
- https://vitejs-kr.github.io/guide/static-deploy.html#github-pages
