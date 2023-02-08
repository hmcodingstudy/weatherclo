import '../App.css';
import { useEffect, useRef, useState } from 'react';
// import Slot from '../components/Slot.js'
import select from '../css/select.module.css'
import '../css/selectEffect.css'


function Select(props) {
  const modal = useRef<any>();
  const selectCnt = useRef<any>();
  const startBtnWrap = useRef<any>();
  const selectResult = useRef<any>();

  let [loading, setloading] = useState(false)
  let [items, setItems] = useState(false)

  const randomSelector1 = () => {
    let outers = [props.outerOpt1,props.outerOpt2]
    return outers[Math.floor(Math.random() * outers.length)];
  }

  const randomSelector2 = () => {
    let tops = [props.topOpt1,props.topOpt2]
    return tops[Math.floor(Math.random() * tops.length)];
  }

  const randomSelector3 = () => {
    let bottoms = [props.bottomOpt1, props.bottomOpt2]
    return bottoms[Math.floor(Math.random() * bottoms.length)];
  }

  const randomSelector4 = () => {
    let shoes = [props.shoesOpt1, props.shoesOpt2]
    return shoes[Math.floor(Math.random() * shoes.length)];
  }

  useEffect(()=>{
    console.log(`items: ${items}`)
    console.log(`loading: ${loading}`)
  })

  // 로딩창(모달창) 출력
  useEffect(()=>{
    if(loading === true){
      modal.current.classList.replace('inactive','modal')
      startBtnWrap.current.classList.replace('startBtnWrap','inactive')

      const timeout = setTimeout(()=>
          {
            modal.current.classList.replace('modal','modal');
            // console.log('모달 사라짐')
          }
      ,2000)
      const timeout2 = setTimeout(()=>
        setItems(true)
      ,2000)
        return () => {clearTimeout(timeout); clearTimeout(timeout2)}
      } 
  },[loading])

  // 결과 출력
  useEffect(()=>{
    if(items === true){
      setloading(false)
      selectCnt.current.classList.replace('selectCntInactive','selectCnt')
      selectResult.current.classList.replace('selectResultinactive','selectResult')
    }
  },[items])

  return (
    <>
      {/* 시작버튼 페이지 */}
      <div className='startBtnWrap' ref={startBtnWrap}>
        <div className={select.chrcWrap1}>
          <div className={select.bubble1}>
              <span className={select.bubbleText1}>버튼누르셈</span>
          </div>
          <div className={select.chrc1}>캐릭터</div>
        </div>
        <span className={select.clickText}>👇 Click !</span>
        <button onClick={()=>{
          setloading(true)
        }} className='startBtn'>옷 고르기 시작</button>
      </div>

      {/* 로딩 페이지 */}
      {loading === true?
        <div className='inactive' ref={modal}>
          <div className='progressBarWrap'>
            <div className='progressBar'></div>
          </div>
          <span>옷 고르는 중..</span>
        </div>
      :
      null  
      }

      {/* 결과 페이지 */}
      {items === true?
      <section className='selectResultinactive' ref={selectResult}>
        <div className={select.chrcWrap2}>
          <div className={select.bubble2}>
                  <span className={select.bubbleText2}>오늘의 착장은?</span>
          </div>
          <div className={select.chrc2}>캐릭터</div>
        </div>
        <div className='selectCntInactive' ref={selectCnt}>
          <div className='selectBoxWrap'>
            {props.outerOpt1&&props.outerOpt2 !== undefined
            ?
            <div className='selectBox'>
              <span>🧥</span>
              <div className='selectBoxResult'>{randomSelector1()}</div>
            </div>
            :null
            }
            {props.topOpt1&&props.topOpt2 !== undefined
            ?
            <div className='selectBox'>
              <span>👚</span>
              <div className='selectBoxResult'>{randomSelector2()}</div>
            </div>
            :null
            }
            {props.bottomOpt1&&props.bottomOpt2 !== undefined
            ?
            <div className='selectBox'>
              <span>👖</span>
              <div className='selectBoxResult'>
              {randomSelector3()}</div>
            </div>
            :null
            }
            {!!props.shoesOpt1 === true
            ?
            <div className='selectBox'>
              <span>👞</span>
              <div className='selectBoxResult'>
              {randomSelector4()}</div>
            </div>
            :null
            }
          </div>
        </div>
        <div className={select.BtnWrap}>
          <button onClick={()=>{
            props.setnextPage(false)
            setItems(false)
            // props.setOuterOpt1(null) 
            // props.setOuterOpt2(null)  
            // props.setTopOpt1(null) 
            // props.setTopOpt2(null) 
            // props.setBottomOpt1(null) 
            // props.setBottomOpt2(null) 
            // props.setShoesOpt1(null)  
            // props.setShoesOpt2(null)  
          }} className={select.goFirstBtn}>처음으로</button>
          <button onClick={()=>{
            setItems(false)
            setloading(true)
          }} className='restartBtn'>다시 고르기</button>
        </div>
      </section>
      :
        null
      }
    </>
  );
}



export default Select;
