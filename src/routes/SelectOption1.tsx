import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import selectOption1 from '../css/selectOption1.module.css'
import '../css/radioBtn.css'
import Select from './Select'

function SelectOption1() {
  // 스위치 온오프
  let [outerBtn, setOuterBtn] = useState(false);
  let [topBtn, setTopBtn] = useState(false);
  let [bottomBtn, setBottomBtn] = useState(false);
  let [shoesBtn, setShoesBtn] = useState(false);
  // let [btn, setBtn] = useState(false);
  let [nextPage, setnextPage] = useState(false);

  // 옵션 입력값
  let [outerOpt1, setOuterOpt1] = useState<any>();
  let [outerOpt2, setOuterOpt2] = useState<any>();
  let [topOpt1, setTopOpt1] = useState<any>();
  let [topOpt2, setTopOpt2] = useState<any>();
  let [bottomOpt1, setBottomOpt1] = useState<any>();
  let [bottomOpt2, setBottomOpt2] = useState<any>();
  let [shoesOpt1, setShoesOpt1] = useState<any>();
  let [shoesOpt2, setShoesOpt2] = useState<any>();
  let [errorText, setErrorText] = useState<string>();


  function check(){
    interface ObjKeys {
      [key: number]: boolean
    }

    let object1: ObjKeys ={
      0: outerBtn, 
      1: topBtn, 
      2: bottomBtn, 
      3: shoesBtn
    }

    let arrayTest = [];

    // **on 상태인 버튼의 옵션값들 탐색하여 하나의 Array로 합치기**
    for (const [key, value] of Object.entries(object1)) {
      if(value === true){
        let keyArray: (number|string)[] = [0,1,2,3]
        let optArray = [[outerOpt1,outerOpt2],[topOpt1,topOpt2],[bottomOpt1,bottomOpt2],[shoesOpt1,shoesOpt2]]

        keyArray.forEach(element=>{
          if(key == element){
            // arrayTest.push(...arrayTest,...optArray[key])
            arrayTest = ([...arrayTest,...optArray[key]])
          }
        })
        }
    }

    // **버튼 최소 1개 이상 on인지 체크**
    let btnArray = [outerBtn,topBtn,bottomBtn,shoesBtn];
    const btnOnExam = (element) => element === true;

    // **옵션 값 존재하는지 체크**
    const exam = (element) => element === undefined||element === '';

    //버튼이 하나라도 true일때
    if(btnArray.some(btnOnExam) === true){
      // setBtn(true)
      setErrorText('')

      if(arrayTest.some(exam) === true){
        setErrorText('옵션을 모두 입력하세요')
      } else {
        setnextPage(true)
      }
      
      // : 
    } else {
      // setBtn(false)
      setErrorText('최소 1개 이상의 옵션을 선택해주세요')
    }
  };


  useEffect(()=>{
    console.log(nextPage)
    console.log(`outerOpt1:${outerOpt1}`)
    console.log(`outerOpt2:${outerOpt2}`)

    if(nextPage === true){
      setOuterBtn(false);
      setTopBtn(false);
      setBottomBtn(false);
      setShoesBtn(false);
    } else {
      // setOuterOpt1('') 
      // setOuterOpt2('')  
      // setTopOpt1('') 
      // setTopOpt2('') 
      // setBottomOpt1('') 
      // setBottomOpt2('') 
      // setShoesOpt1('')  
      // setShoesOpt2('')  
    }
  },[nextPage]);

  return (
    <>
      <div>
      {nextPage === false?
        <section className={selectOption1.section}>   
          <div className={selectOption1.container}>
            <span className={selectOption1.titleText}>옵션을 선택해 주세요</span>
            <span style={{marginBottom:'35px',display:'block',color:'red'}}>{errorText}</span>
            <div className={selectOption1.checkboxCnt}>
              <Options1 outerBtn={outerBtn} setOuterBtn={setOuterBtn} topBtn={topBtn} setTopBtn={setTopBtn} bottomBtn={bottomBtn} setBottomBtn={setBottomBtn} shoesBtn={shoesBtn} setShoesBtn={setShoesBtn} outerOpt1={outerOpt1} setOuterOpt1={setOuterOpt1}
              outerOpt2={outerOpt2} setOuterOpt2={setOuterOpt2} topOpt1={topOpt1} setTopOpt1={setTopOpt1} topOpt2={topOpt2} setTopOpt2={setTopOpt2} bottomOpt1={bottomOpt1} bottomOpt2={bottomOpt2} setBottomOpt1={setBottomOpt1} setBottomOpt2={setBottomOpt2} shoesOpt1={shoesOpt1} shoesOpt2={shoesOpt2} setShoesOpt1={setShoesOpt1} setShoesOpt2={setShoesOpt2}/>
            </div>
              <button 
              onClick={()=>
                `${check()}`
                // console.log(`outerOpt1:${outerOpt1}outerOpt2:${outerOpt2}`)
                // console.log(`outerOpt2:${outerOpt2}`)
                // ${setOuterBtn(false)}${setTopBtn(false)}${setBottomBtn(false)}${setShoesBtn(false)}
              } 
              className={selectOption1.nextBtn} type="submit">Next</button>
          </div>
        </section>
      :
        <Select outerOpt1={outerOpt1} setOuterOpt1={setOuterOpt1}
        outerOpt2={outerOpt2} setOuterOpt2={setOuterOpt2} topOpt1={topOpt1} setTopOpt1={setTopOpt1} topOpt2={topOpt2} setTopOpt2={setTopOpt2} bottomOpt1={bottomOpt1} bottomOpt2={bottomOpt2} setBottomOpt1={setBottomOpt1} setBottomOpt2={setBottomOpt2} shoesOpt1={shoesOpt1} shoesOpt2={shoesOpt2} setShoesOpt1={setShoesOpt1} setShoesOpt2={setShoesOpt2} setnextPage={setnextPage}/>
      }
      </div>
      </>
  );
}


function Options1(props){

  const onChange = (e) => {
    if(e.target.name == 'outer_opt1'){
      props.setOuterOpt1(e.target.value);
      console.log(e.target.value)
    } else if(e.target.name == 'outer_opt2'){
      props.setOuterOpt2(e.target.value);
      console.log(e.target.value)
    } else if(e.target.name == 'top_opt1'){
      props.setTopOpt1(e.target.value);
    } else if(e.target.name == 'top_opt2'){
      props.setTopOpt2(e.target.value);
    } else if(e.target.name == 'bottom_opt1'){
      props.setBottomOpt1(e.target.value);
    } else if(e.target.name == 'bottom_opt2'){
      props.setBottomOpt2(e.target.value);
    } else if(e.target.name == 'shoes_opt1'){
      props.setShoesOpt1(e.target.value);
    } else if(e.target.name == 'shoes_opt2'){
      props.setShoesOpt2(e.target.value);
    }
};


  return(
    <>
    <div className="checkboxWrap">
      <input onClick={()=>{
        props.outerBtn? props.setOuterBtn(false) : props.setOuterBtn(true)
        console.log(`겉옷 스위치 : ${props.outerBtn}`)
      }} type="checkbox" className="switch"/>
      <label>겉옷</label>
    </div>
    {/* 겉옷 */}
    {props.outerBtn? 
      <>
        <div className={selectOption1.textInputWrap}>
          <input onChange={onChange} className={selectOption1.textInput} name='outer_opt1' placeholder='옵션1' type="text" required/>
          <input onChange={onChange} className={selectOption1.textInput} name='outer_opt2' placeholder='옵션2' type="text" required/>
        </div> 
      </>
    :null}
    {/* 상의 */}
    <div className="checkboxWrap">
      <input onClick={()=>{
        props.topBtn? props.setTopBtn(false) : props.setTopBtn(true)
        }} type="checkbox" className="switch"/>
      <label>상의</label>
    </div>
    {props.topBtn? 
      <>
        <div className={selectOption1.textInputWrap}>
          <input onChange={onChange} className={selectOption1.textInput} name='top_opt1' placeholder='옵션1' type="text"/>
          <input onChange={onChange} className={selectOption1.textInput} name='top_opt2' placeholder='옵션2' type="text"/>
        </div> 
      </>
    :null}
    {/* 하의 */}
    <div className="checkboxWrap">
      <input onClick={()=>{
        props.bottomBtn? props.setBottomBtn(false) : props.setBottomBtn(true)
        }} type="checkbox" className="switch"/>
      <label>하의</label>
    </div>
    {props.bottomBtn? 
      <>
        <div className={selectOption1.textInputWrap}>
          <input onChange={onChange} className={selectOption1.textInput} name='bottom_opt1'  placeholder='옵션1' type="text"/>
          <input onChange={onChange} className={selectOption1.textInput} name='bottom_opt2'  placeholder='옵션2' type="text"/>
        </div> 
      </>
    :null}
    {/* 신발 */}
    <div className="checkboxWrap">
      <input onClick={()=>{
        props.shoesBtn? props.setShoesBtn(false) : props.setShoesBtn(true)
        }} type="checkbox" className="switch"/>
      <label>신발</label>
    </div>
    {props.shoesBtn? 
      <>
        <div className={selectOption1.textInputWrap}>
          <input onChange={onChange} className={selectOption1.textInput}  name='shoes_opt1' placeholder='옵션1' type="text"/>
          <input onChange={onChange} className={selectOption1.textInput}  name='shoes_opt2' placeholder='옵션2' type="text"/>
        </div> 
      </>
    :null}
    </>
  )
}

export default SelectOption1;
