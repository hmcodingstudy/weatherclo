import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Weather from './Weather'
import Select from '../routes/Select'
import Ootd from '../routes/Ootd'
import SelectOption1 from '../routes/SelectOption1'
import AddMemo from '../routes/AddMemo'
import OotdDetail from '../routes/OotdDetail'
import OotdEdit from '../routes/OotdEdit'
import Nav from './Nav';

interface IData {
  lat: any,
  lon: any,
}
function Router() {
    let [locLoaded, setLocLoaded] = useState(false);
    let [loaded, setLoaded] = useState(false);
    let [location, setLocation] = useState({
      lat : '', 
      lon : ''});
    type weather_ = {
      id: any,
      weather: any,
      name: any,
      temp: any,
      main : any,
      description: any,
      humidity: any,
      time: any,
    }
    let [weatherNow, setWeatherNow] = useState<weather_>({
      id: null,
      weather: null,
      name: null,
      temp: null,
      main : null,
      description: null,
      humidity: null,
      time: null
    });
  
    //1. 현재 위치 추적
    useEffect(() => {
      function getUserPosition() {
        navigator.geolocation.getCurrentPosition(success, fail);
      }
      function success({ coords, timestamp }:any) {
        const u_latitude = coords.latitude;   // 위도
        const u_longitude = coords.longitude; // 경도
        //state 변경

        let copy :any = {...location};
        copy.lat = u_latitude
        copy.lon = u_longitude
        setLocation(copy)
        setLocLoaded(true)
        // console.log(location)
      }
      function fail() {
          console.log('error!')
          setLocLoaded(false)
      }
      getUserPosition()
      }, []);
  
      
      //2. 날씨 정보 셋팅 함수 실행
      useEffect(()=>{
        // console.log(location)
        setTimeout(()=>{
            // const API_KEY = 'f48b65ce00358f1ac50fe8ab075830dc'
            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
            async function getData(){
            const response = await fetch(url);
            const data = await response.json();
            let time_ = new Date()
            // console.log(time_)
            let tempNow = data.main.temp - 273.15
            // console.log(data)
            setWeatherNow({
              id:data.weather[0].id,
              weather : data.weather[0].main,
              // weather:'Haze',
              name: data.name,
              temp: Math.floor(tempNow),
              // temp: 14,
              // temp: data.main.temp,
              main : data.weather[0].main,
              description : data.weather[0].description,
              humidity:data.main.humidity,
              time: time_
            });
          }
          setLoaded(true);
          getData()
          },100)
        },[locLoaded])

        
       

    return (
        <>
        {/* <Router> */}
          <Routes>
              
              <Route path="/" element={
                  locLoaded ? <Weather weatherNow={weatherNow} setWeatherNow={setWeatherNow} location={location}/> : ''
              }/>
              {/* {console.log(weatherNow)} */}
              <Route path="/select" element={<Select/>}/>
              <Route path="/selectoption1" element={<SelectOption1/>}/>
              <Route path="/ootd" element={<Ootd/>}/>
              <Route path="/detail/:id" element={<OotdDetail/>}/>
              <Route path="/edit/:id" element={<OotdEdit/>}/>
              <Route path="/addmemo" element={<AddMemo/>}/>
              <Route path="*" element={ <div>존재하지 않는 페이지입니다.</div> } />
          </Routes>
        {/* </Router> */}
        </>
    );
}

export default Router;
