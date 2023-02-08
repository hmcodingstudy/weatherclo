
import '../App.css';
import '../css/calender.css';
import '../css/addMemoEffect.css';
import 'react-calendar/dist/Calendar.css';
import addMemo from '../css/addMemo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid'
import { addPost } from "../data/data"
import { RootState } from '../index'

function AddMemo() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let state = useSelector((state :RootState)=> state)
    const [value, onChange] = useState(new Date());

    //캘린더 온오프
    let [calender,setCalender] = useState(false);
    let [photo,setPhoto] = useState(null);
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

    function previewFile(e) {
        var fileSelect = document.querySelector('.realUpload') as HTMLInputElement;

        var file = fileSelect.files[0];
        var reader = new FileReader();
        var previewtest = document.querySelector('.imagePreview');
        var ul = document.querySelector('ul');
        var fakeUpload = document.querySelector('.fakeUpload')

        reader.addEventListener('load', (e) => {
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
            fakeUpload.setAttribute('data-file', file.name);
            setPhoto(e.target.result)
            return fakeUpload;
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
            } else if(photo === null){
                alert('사진을 선택해주세요');
                return false;
            }else{
                dispatch(
                    addPost(
                    {
                    id: uuid(),
                    title: titleValue,
                    image: photo, 
                    content: contentValue,
                    date : dateFormat(value),
                    month : postMonth
                }
                ))
                
                alert('등록되었습니다.');
                navigate('/ootd')
            }
        }



  return (
      <>
        <form className={addMemo.form} name="notice_form" action="" method="post">
            <fieldset>
                <div className={addMemo.cntContainer}>
                    <input className='inputTitle' type="text" name="n_title" id="n_title" placeholder="제목 입력"/>

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
                    }} className={
                        calender? 'fakeUploadInactive': 'fakeUpload'
                    }>
                        {photo === null?  <FontAwesomeIcon icon={faCamera} className={addMemo.cameraIcon} />
                        : null }
                    </div>
                    <textarea className='textarea' cols={30} rows={5} name={addMemo.textarea} placeholder='내용 입력'></textarea>
                    <input type="file" 
                    onChange={(e)=> {previewFile(e)}} style={{display:'none'}}
                    className='realUpload' accept="image/*" required multiple/>
                </div>
                <button 
                 onClick={(e)=>{
                    e.preventDefault();
                    uploadCheck()
                }}
                type="submit" className="submitBtn">Upload</button>
            </fieldset>
        </form>
      </>
  );
}




export default AddMemo;
