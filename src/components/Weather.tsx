
import '../App.css';
import '../css/mainEffect.css';
import { useEffect, useState,useRef } from 'react';
// import styled from 'styled-components'
import weatherStyle from '../css/weatherStyle.module.css'
import { ReactComponent as Cloudy } from '../images/cloudy.svg'
import { ReactComponent as Humidity } from '../images/humidity.svg'


function Weather(props: any) {
  let [icon, setIcon] = useState('./images/clear-day.svg')
  // let [hourlyIcon, setHourlyIcon] = useState('./images/clear-day.svg')

  let [weatherText,setWeatherText] = useState<string>()
  // Clear,Clouds,Rain,Snow,Thunderstorm,Drizzle,
  let [time, setTime] = useState<string>()
  let [on, setOn] = useState(false)
  let [hourly, setHourly] = useState<any>();
  let [hourlyLoaded, setHourlyLoaded] = useState(false);
  let [tab, setTab] = useState(1);

  const tab1Cnt = useRef<any>();
  const tab2Cnt = useRef<any>();

  
useEffect(()=>{

  function contentChange(){
    if(window.innerWidth >= 992) {
      tab1Cnt.current.classList.replace('charcContainerInactive','charcContainer')
      tab2Cnt.current.classList.replace('hourlyContainerInactive','hourlyContainer')
    }
    else if(window.innerWidth < 992){
      if(tab == 1){
        tab1Cnt.current.classList.replace('charcContainerInactive','charcContainer')
        tab2Cnt.current.classList.replace('hourlyContainer','hourlyContainerInactive')
      } else if(tab == 2){
        tab1Cnt.current.classList.replace('charcContainer','charcContainerInactive')
        tab2Cnt.current.classList.replace('hourlyContainerInactive','hourlyContainer')
      }
    }
}
  contentChange()
  window.addEventListener('resize',()=>{
    contentChange()
})
},[tab])


 // 3.시간별 날씨 조회
 useEffect(()=>{
  setTimeout(()=>{
      // const API_KEY = 'f48b65ce00358f1ac50fe8ab075830dc'
      const API_KEY = '1a6d7d0147bfcef8e3fa88e20317951b'
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.location.lat}&lon=${props.location.lon}&appid=${API_KEY}`

      async function getData(){
        const response = await fetch(url);
        const data = await response.json();
        // [현재 시간 이후 날씨 추출]
        const array :any = data.list;
        let times :any = [];

        array.forEach((element :any) => {
          let hTime = new Date(element.dt_txt);
          if(hTime > props.weatherNow.time){
            times.push(element)
          }
        });

        // times.forEach(element => {
        //   let hTime = new Date(element.dt_txt);
        //   if(hTime < weatherNow.time){
        //     times.splice(element,1)
        //   }
        // });

        // [state에 이후 7번의 날씨 저장]
        let selectedTimes:any = times.slice(0,7);
        // console.log(selectedTimes)
        if(selectedTimes != hourly){
          setHourly(selectedTimes)
          setHourlyLoaded(true)
          // console.log(hourly)
        }
          else{
            return
          }
          // console.log(hourly)
      }
      getData()
      
    },100)
  },[hourlyLoaded])


  // 날짜
  useEffect(()=>{
      const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const now = setInterval(() => {
        let days = new Date();
        let day = WEEKDAY[days.getDay()];
        let hours = days.getHours();
        let minutes :number|string = days.getMinutes();
        if(minutes < 10){
          minutes = '0' + minutes
        }
        setTime(`${day}, ${hours}:${minutes}`)
        // console.log(time)
      }, 1000);
      return (() => clearInterval(now))
  },[time])
  

  useEffect(()=>{
    const now = props.weatherNow.weather;
    function Icon(){
      console.log(now)
      if(now == 'Clouds'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/cloudy.svg')
        setWeatherText('흐려요')
      } else if(now == 'Clear'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/clear-day.svg')
        setWeatherText('맑음')
      } else if(now == 'Rain'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/rain.svg')
        setWeatherText('비 내려요')
      } else if(now == 'Snow'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/snow.svg')
        setWeatherText('눈 와요')
      }else if(now == 'Thunderstorm'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/thunderstorms.svg')
        setWeatherText('천둥 번개 조심')
      }else if(now == 'Drizzle'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/drizzle.svg')
        setWeatherText('이슬비 내려요')
      }else if(now == 'Mist'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/mist.svg')
        setWeatherText('엷은 안개 껴요')
      }else if(now == 'Smoke'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/smoke.svg')
        setWeatherText('연기 껴요')
      }else if(now == 'Haze'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/haze.svg')
        setWeatherText('연기와 안개 껴요')
      }else if(now == 'Dust'||now == 'Sand'||now == 'Ash'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/dust.svg')
        setWeatherText('먼지 껴요')
      }else if(now == 'Fog'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/fog.svg')
        setWeatherText('안개 껴요')
      }else if(now == 'Squall'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/tornado.svg')
        setWeatherText('돌풍 와요')
      }else if(now == 'Tornado'){
        setIcon('https://hmcodingstudy.github.io/weatherclo/images/tornado.svg')
        setWeatherText('토네이도 와요')
      }
    }
    Icon()
  })


  // useEffect(()=>{
    function hourlyIcon(now : string){
      // return(
      //   <>
      if(now == 'Clouds'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/cloudy.svg'
      } 
      else if(now == 'Clear'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/clear-day.svg'
      } else if(now == 'Rain'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/rain.svg'
      } else if(now == 'Snow'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/snow.svg'
      }else if(now == 'Thunderstorm'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/thunderstorms.svg'
      }else if(now == 'Drizzle'){
        return 'https://hmcodingstudy.github.io/weatherclo/images/drizzle.svg'
      }
      // </>
      // )
    }
    // hourlyIcon()
  // })


//   function dateFormat(date) {
//     let month = date.getMonth() + 1;
//     let day = date.getDate();

//     month = month >= 10 ? month : '0' + month;
//     day = day >= 10 ? day : '0' + day;

//     return date.getFullYear() + '-' + month + '-' + day;
// }

  return (
    <>
      <main className={weatherStyle.main}>
        {/* <section style={{width:'100%'}}> */}
          <div className={weatherStyle.screen1}>
            <div className={weatherStyle.locationWrap}>
              <button className={weatherStyle.locationBtn}>위치 버튼</button>
              <div className={weatherStyle.cityName}>{props.weatherNow.name}</div>
            </div>

            {/* 날씨 아이콘 */}
            <div className={weatherStyle.weatherIconWrap}>
              <div className={weatherStyle.weatherIconBox}>
                <img src={ icon } className='weatherIcon'></img>
              </div>
            {/* <div style={{display:'flex', justifyContent:'center'}}><Drizzle width={300} height={300} /></div> */}

            {/* 온도 */}
              <div className={weatherStyle.tempWrap}>
                <span className={weatherStyle.tempNumber}>{props.weatherNow.temp}</span>
                <span className={weatherStyle.tempSymbol}>℃</span>
              </div>
              <div className={weatherStyle.etcData}>
                {/* <Date/> */}
                <span className={weatherStyle.etcDate}>{time}</span><br/>
                <hr style={{width:'90%', height:'1px',background:'#e6e6e6',border:'0'}}/>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginRight: '32px'}}>
                  <Humidity width={50}/>
                  <span>습도 : </span>
                  <span>{props.weatherNow.humidity}</span>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginRight: '32px'}}>
                  <Cloudy width={50}/><span>{props.weatherNow.description}</span>
                </div>
              </div>
            </div>
            {/* <div className={weatherStyle.mainTextWrap}>
              <span className={weatherStyle.mainTextFix}>오늘은</span>
              <span className={weatherStyle.mainTextCng}>{weatherText}</span>
            </div> */}
          </div>
        {/* </section> */}
        
        <section className={weatherStyle.screen2}>
          <div className={weatherStyle.tabMenu}>
            <button className={weatherStyle.tab1} onClick={()=> setTab(1)} style={tab == 1? {
              backgroundColor:'rgb(207, 176, 247)'}  : {
                backgroundColor:'white'}}>clothes</button>
            <button className={weatherStyle.tab2}
            onClick={()=> setTab(2)} style={tab == 2? {
              backgroundColor:'rgb(207, 176, 247)'} : {
                backgroundColor:'white'}}
              >hourly</button>
          </div>
          <ul className='hourlyContainer' ref={tab2Cnt}>
            {
              hourlyLoaded?
                hourly.map((a : any,i : any) => {
                  return(
                      <li className={weatherStyle.hourly} key={i}>
                        <span className={weatherStyle.hourlyDate}>{
                          hourly[i].dt_txt.substr(5, 1) == 0?
                        `${hourly[i].dt_txt.substr(6, 1)}월 `
                        :`${hourly[i].dt_txt.substr(5, 2)}월 `
                        }
                        {
                          hourly[i].dt_txt.substr(8, 1) == 0?
                        `${hourly[i].dt_txt.substr(9, 1)}일`
                        :`${hourly[i].dt_txt.substr(8, 2)}일`
                        }
                        </span>
                        {/* <span className={weatherStyle.hourlydate}>{
                          hourly[i].dt_txt.substr(8, 1) == 0?
                        `${hourly[i].dt_txt.substr(9, 1)}일`
                        :`${hourly[i].dt_txt.substr(8, 2)}일`
                        }
                        </span> */}
                        <span className={weatherStyle.hourlyHour}>{
                          hourly[i].dt_txt.substr(11, 1) == 0?
                          `${hourly[i].dt_txt.substr(12, 1)}시`
                          :`${hourly[i].dt_txt.substr(11, 2)}시`
                        }</span><br/>
                        {/* <span>{hourly[i].weather[0].main}</span> */}
                        <img src={ hourlyIcon(hourly[i].weather[0].main) } style={{display:'block',margin:'-15px auto 0',width:'100px'}}></img>
                        <span className={weatherStyle.hourlyTemp}>{
                        `${Math.floor(hourly[i].main.temp - 273.15)}℃`
                        
                        }</span>
                      </li>

                    // </section>
                    )
                  })
                  : null
              }
          </ul>

          <div className='charcContainerInactive' ref={tab1Cnt}>
            <div className={weatherStyle.characterWrap}>
              <div className={weatherStyle.bubble}>
                  <span className={weatherStyle.bubbleText}>오늘의 날씨는<br/> {weatherText}</span>
              </div>
              <div className={weatherStyle.character}>캐릭터</div>
            </div>
            <Clothes weatherNow={props.weatherNow}/>
          </div>
        </section>
      </main>
    </>
  );
}


function Clothes(props:any){
  let [clothes1, setClothes1] = useState<string>()
  let [clothes2, setClothes2] = useState<string>()
  let [clothes3, setClothes3] = useState<string>()
  
  const clo1 = useRef<any>();
  const clo2 = useRef<any>();
  const clo3 = useRef<any>();

  useEffect(()=>{
      let tempNow = props.weatherNow.temp;
      
      function tempClothes(){
        if(tempNow <= 4){
          setClothes1('롱패딩')
          setClothes2('니트')
          setClothes3('기모바지')
          clo1.current.classList.replace('롱패딩','롱패딩')
          clo2.current.classList.replace('니트','니트')
          clo3.current.classList.replace('기모바지','기모바지')
        } 
        else if(4 < tempNow && tempNow < 9){
          setClothes1('코트')
          setClothes2('가죽자켓')
          setClothes3('니트')
          clo1.current.classList.replace('롱패딩','코트')
          clo2.current.classList.replace('니트','가죽자켓')
          clo3.current.classList.replace('기모바지','니트')
        } 
        else if(8 < tempNow && tempNow < 12){
          setClothes1('트렌치코트')
          setClothes2('자켓')
          setClothes3('니트')
          clo1.current.classList.replace('롱패딩','트렌치코트')
          clo2.current.classList.replace('니트','자켓')
          clo3.current.classList.replace('기모바지','니트')
        } else if(11 < tempNow && tempNow < 17){
          setClothes1('가디건')
          setClothes2('자켓')
          setClothes3('긴바지')
          clo1.current.classList.replace('롱패딩','가디건')
          clo2.current.classList.replace('니트','자켓')
          clo3.current.classList.replace('기모바지','청바지')
        } else if(16< tempNow && tempNow <20){
          setClothes1('맨투맨')
          setClothes2('얇은니트')
          setClothes3('긴바지')
        } else if(19<tempNow && tempNow<23){
          setClothes1('긴팔티셔츠')
          setClothes2('셔츠')
          setClothes3('얇은 가디건')
        } else if(22 < tempNow && tempNow < 28){
          setClothes1('반팔')
          setClothes2('린넨 셔츠')
          setClothes3('반바지')
        } else{
          setClothes1('민소매')
          setClothes2('반팔')
          setClothes3('반바지')
        }
      }
      tempClothes()
    },[props.weatherNow.temp,clothes1,clothes2,clothes3])

  return(
    <div className={weatherStyle.cloContainer}>
    {/* <h4>오늘 날씨에 맞는 옷은?</h4> */}
    <div className={weatherStyle.cloWrap}>
      <div className='clo1'>
        <span className='clo1Text'>{clothes1}</span>
        <div ref={clo1} className='롱패딩'>
          {/* <div className={clothes1}/> */}
        </div>
      </div>
      <div className='clo2'>
        <span className='clo2Text'>{clothes2}</span>
        <div ref={clo2} className='니트'>
          {/* <div className={clothes2}/> */}
        </div>
      </div>
      <div className='clo3'>
        <span className='clo3Text'>{clothes3}</span>
        <div ref={clo3} className='기모바지'>
          {/* <div className={clothes3}/> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Weather;
