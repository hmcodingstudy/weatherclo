import '../App.css';
import '../css/calender.css';
import '../css/addMemoEffect.css';
import '../css/ootdEditEffect.css';

import { useEffect, useRef, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import addMemo from '../css/addMemo.module.css'
import ootdEdit from '../css/ootdEdit.module.css'
import { useDispatch, useSelector } from "react-redux"
import { editPost} from "../data/data"
import { RootState } from '../index'

function OotdEdit() {
    const fileImage = useRef<any>();
    
let navigate = useNavigate()
  let {id} = useParams();
  let dispatch = useDispatch()
  let state = useSelector((state :RootState)=> state)
  const found = state.month1.find((x)=>{
    return x.id == id
    });

  const [value, onChange] = useState(new Date(found.date));
  let [textContent, setTextContent] = useState(found.content);
  let [textTitle, setTextTitle] = useState(found.title);


  //캘린더 온오프
  let [calender,setCalender] = useState(false);
  let [photo,setPhoto] = useState(`url(${found.image})`);
  let [postMonth, setPostMonth] = useState(null);

  let cal = document.querySelector('.react-calendar')

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

// 사진 업로드
function previewFile(e) {
  var fileSelect = document.querySelector('.realUpload') as HTMLInputElement;

  var file = fileSelect.files[0];
  var reader = new FileReader();
  var previewtest = document.querySelector('.imagePreview');
//   var ul = document.querySelector('ul');
  var fakeUpload = document.querySelector('.fakeUpload')
//   var e_fakeUpload = document.querySelector('.e_fakeUpload')
    reader.addEventListener('load', (e) => {
        const preview= createElement(e, file);
        fileImage.current.appendChild(preview);
    },false);

    if (file) {
    reader.readAsDataURL(file);
    }}

  function createElement(e, file) {
    fileImage.current.style.backgroundImage = `url( ${e.target.result} )`
    fileImage.current.style.backgroundSize = 'cover'
    fileImage.current.style.backgroundRepeat  = 'no-repeat'
    fileImage.current.setAttribute('data-file', file.name);
    setPhoto(e.target.result)
    return fileImage;
  }

// **textarea 텍스트 변경
  function onChangeContent(e){
    setTextContent(e.target.value)
  }

  function onChangeTitle(e){
    setTextTitle(e.target.value)
  }

  // **유효성 검사**
  function uploadCheck(){
    let titleSelect = document.querySelector('.inputTitle') as HTMLInputElement;
    let contentSelect = document.querySelector('.textarea') as HTMLInputElement;
    let titleValue= titleSelect.value; 
    let contentValue= contentSelect.value;

    if(titleValue === ''||contentValue === ''){
        alert('내용을 모두 입력해주세요');
        return false;
    } else{
        // var foundItem = state.month1.find(() => id === state.month1.id);
        // console.log(id)

        // console.log(state.month1.id)
        if(photo !== null || photo !== undefined){
            dispatch(
                editPost(
                    {
                        id: id,
                        title: textTitle, 
                        content: textContent,
                        date : dateFormat(value),
                        month : postMonth,
                        image: photo
                    }
                    ))
            alert('수정되었습니다.')
            navigate('/ootd')
        } else {
            dispatch(
                editPost(
                    {
                        id: id,
                        title: textTitle, 
                        content: textContent,
                        date : dateFormat(value),
                        month : postMonth,
                    }
            ))
        }
    }
}

  return (
    <>
        <form className={addMemo.form} name="notice_form" action="" method="post">
            <fieldset>
                <div className={addMemo.cntContainer}>
                    <input className='inputTitle' type="text" name="n_title" id="n_title" placeholder="제목 입력" onChange={onChangeTitle} value={textTitle} required/>
                    <div className={addMemo.calenderBtnWrap}>
                        <span className={addMemo.date}>{
                        dateFormat(value)}</span>
                        <button onClick={() => {
                        calender? setCalender(false) : setCalender(true);
                        }} type='button' className={addMemo.calendarBtn}>Select date</button>
                    </div>

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

                    <div onClick={()=>{
                        const target = document.querySelector('.realUpload') as HTMLInputElement;
                        target.click();
                    }} ref={fileImage} className={
                        calender? 'e_fakeUploadInactive': 'e_fakeUpload'
                    } style={{backgroundImage:photo,backgroundSize:'cover'}}>
                    </div>


                    <textarea className='textarea' cols={30} rows={5} name={addMemo.textarea} placeholder='내용 입력' value={textContent} onChange={onChangeContent}required></textarea>
                    <input type="file" 
                    onChange={(e)=> {previewFile(e)}} style={{display:'none'}}
                    className='realUpload' accept="image/*" required multiple/>
                </div>
                <div style={{display:'flex'}}>
                {/* 수정 버튼 */}
                <button 
                 onClick={(e)=>{
                    e.preventDefault();
                    uploadCheck()
                }}
                type="submit" className={ootdEdit.editBtn}>수정</button>
                </div>
            </fieldset>
        </form>
    </>
  );
}

export default OotdEdit;
