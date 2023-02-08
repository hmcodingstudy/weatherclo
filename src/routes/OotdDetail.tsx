import '../App.css';
import '../css/calender.css';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
// import ootdDetail from '../css/ootdDetail.module.css'
import ootdDetail from '../css/ootdDetail.module.css'
import { useDispatch, useSelector } from "react-redux"
import { deletePost} from "../data/data"
import { RootState } from '../index'

function OotdDetail() {
let navigate = useNavigate()
  let {id} = useParams();
  let dispatch = useDispatch()
  let state = useSelector((state :RootState)=> state)
  const [value, onChange] = useState(new Date());
  //캘린더 온오프
  let [calender,setCalender] = useState(false);
  let [photo,setPhoto] = useState(null);
  let [postMonth, setPostMonth] = useState(null);

//   let cal = document.querySelector('.react-calendar')

  const found = state.month1.find(function(x){
    return x.id == id
    });

  //날짜 format
  function dateFormat(value){
      let month = value.getMonth() + 1;
      // setPostMonth(month)
      let day = value.getDate();
      return value.getFullYear() + '.' + month + '.' + day;
  }

  useEffect(()=>{
      setPostMonth(value.getMonth() + 1)
  })

// ootdDetail 페이지에서 고유 id 다시 지정하기(삭제시 에러남)
function previewFile(e) {
  var fileSelect = document.querySelector('.realUpload') as HTMLInputElement;

  var file = fileSelect.files[0];
  var reader = new FileReader();
  var previewtest = document.querySelector('.imagePreview');
  var ul = document.querySelector('ul');
  var fakeUpload = document.querySelector('.fakeUpload')

  reader.addEventListener('load', (e) => {
          // previewtest.src = reader.result;
          const preview = createElement(e, file);
          ul.appendChild(preview);
      },false);
  
  if (file) {
      reader.readAsDataURL(file);
  }}

  function createElement(e, file) {
      var fakeUpload = document.querySelector('.fakeUpload') as HTMLInputElement;  
      fakeUpload.style.backgroundImage = `url( ${e.target.result} )`
      fakeUpload.style.backgroundSize = 'cover'
      fakeUpload.style.backgroundRepeat  = 'no-repeat'
      setPhoto(e.target.result)
      // console.log(photo)
      return fakeUpload;
  }

  console.log(state.month1)

  return (
    <>
        <form className={ootdDetail.form} name="notice_form" action="" method="post">
            <fieldset>
                <div className={ootdDetail.cntContainer}>
                    <div className={ootdDetail.calenderBtnWrap}>
                        <span className={ootdDetail.date}>{found.date}</span>
                    </div>
                    <h4 className={ootdDetail.title}># {found.title}</h4>

                    <div style={{position:'relative'}}>
                        <Calendar 
                            onChange={onChange} 
                            value={value}
                            minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                            maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                            showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                            className={
                            calender? 'react-calendar': 'calInactive'
                        }/>
                        <div className="text-gray-500 mt-4"></div>
                    </div>

                    {/* 텍스트 내용 */}
                    <div className={ootdDetail.picture} style={{backgroundImage:`url(${found.image})`,backgroundSize:'cover'}}></div>
                    <span className={ootdDetail.content}>{found.content}</span>
                </div>
                <div style={{display:'flex',margin:'auto',width:'320px',justifyContent: 'center'}}>
                {/* 수정 버튼 */}
                <button 
                 onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/edit/${found.id}`)
                }}
                type="submit" className={ootdDetail.editBtn}>수정</button>
                {/* 삭제 버튼 */}
                <Delete/>
                </div>
            </fieldset>
        </form>
    </>
  );
}

function Delete(){
    let navigate = useNavigate()
    let {id} = useParams();
    let dispatch = useDispatch()
    let state = useSelector((state :RootState)=> state)
    const found = state.month1.find(function(x){
        return x.id == id
        });

        function warning(){
            const warningWindow = window.confirm('이 게시물을 삭제하시겠습니까?')
            if(warningWindow === true){
                alert('삭제되었습니다.')
                dispatch(deletePost(found))
                console.log(found)
                navigate(`/ootd`)
            }
        }


    return(
        <>
        <button onClick={(e)=>{
            e.preventDefault();
            warning()
        }}
        type="submit" className={ootdDetail.deleteBtn}>삭제</button>
        </>
    )
}

export default OotdDetail;
