
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import memo from '../css/memo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { faCirclePlus,faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../index'

function Ootd() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let state = useSelector((state :RootState)=> state)
  const monthNumber = useRef();
  let nowMonth = new Date().getMonth() + 1;
  let [month,setmonth] = useState(nowMonth);

  
// addMemo 페이지에서 고유 id 다시 지정하기(삭제시 에러남)

  return (
      <div>
        <div className={memo.titleBox}>
          <h2>OOTD log</h2>
        </div>
        <div className={memo.container}>
          <div className={memo.monthWrap}>
            <button className={memo.arrowBtnLeft} onClick={()=>{
             setmonth( month > 1 ? month - 1 : 1)
            //  console.log(month)
            }} >
              <FontAwesomeIcon icon={faChevronLeft} className={memo.arrowIcon}/>
            </button>
            <div>
              <span className='monthNumber' ref={monthNumber}>{month}</span>
              <span>월</span>
            </div>
            <button onClick={()=>{
             setmonth( month < 12 ? month + 1 : 12)
            //  console.log(month)
            }} className={memo.arrowBtnRight}>
              <FontAwesomeIcon icon={faChevronRight} className={memo.arrowIcon}/>
            </button>
          </div>
          <section className={memo.contents}>
            <div className={memo.cntWrap}>
                {
                  state.month1.map((a, i) => {
                      return(
                        state.month1[i].month == month?
                        <div className={memo.cnt} key={i} onClick={()=>{ navigate(`/detail/${state.month1[i].id}`) }}>
                          <span className={memo.date}>{state.month1[i].date}</span>
                          <span className={memo.photoTitle}># {state.month1[i].title}</span>
                          
                          <div style ={ {position:'relative',backgroundImage: "url("+ state.month1[i].image +")", backgroundSize:'cover'}} className={memo.photo}></div>
                        </div>
                        : null
                      )
                })
              }
            </div>
          </section>
          <Link to="/addmemo">
            <button><FontAwesomeIcon icon={faCirclePlus} className={memo.plusIcon} /></button>
          </Link>
        </div>
      </div>
  );
}

export default Ootd;
