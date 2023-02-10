## WeatherClo

<img src="https://user-images.githubusercontent.com/116494960/217752094-f056805c-e6d3-4742-abcd-7d3d2ffd4d33.jpg"/>

https://hmcodingstudy.github.io/weatherclo/

## 💻 프로젝트 소개

날씨에 맞는 옷을 추천해주는 PWA 웹 사이트입니다. 현재 날씨와 3시간 주기의 앞으로의 날씨, 옷 고르기, 옷 기록하기 등의 기능을 구현하여 사용자의 편의를 도모하였습니다.
Redux-toolkit과 Redux-persist를 사용하여 기록한 내용이 localhost에 저장되도록 설정했습니다.

## ⌚ 개발 기간

23.01.15 ~ 02.10

## 🛠 사용 언어
- React
- TypeScript
- Redux-toolkit
- Redux-persist

## 🛠 사용 API
- Weather API (현재 날씨, 3시간 주기 날씨  api)
- Geolocation.getCurrentPosition() API(현재 위치 추적 api)
- FileReader API(파일 업로드 api)

## 📌 주요 기능

### 반응형 지원


<img src="https://user-images.githubusercontent.com/116494960/217753261-56374026-236d-4df8-8246-a89ddce1d7ff.png"/>

### 메인페이지
- 사용자 현재 위치 추적(api 사용)
- 사용자 위치 기반으로 현재 날씨 출력(api 사용)
- 현재 날씨 이후 시간으로 3시간 간격 날씨 조회(api 사용)
- 오늘 날씨에 맞는 옷 추천

<img src="https://user-images.githubusercontent.com/116494960/217753848-7c2e94f4-4723-45c6-8fb6-13a1b6e9616b.png"/>
<img src="https://user-images.githubusercontent.com/116494960/218044413-bba26abd-0b67-4fec-ae7d-4702395dbab3.jpg" width="350"/>
<img src="https://user-images.githubusercontent.com/116494960/218044285-d99a1c6c-2543-43d4-8f78-0979ce6e1ca2.jpg" width="350"/>

### select 페이지
- 오늘 입을 옷이 고민될 때 골라주는 기능
- 원하는 옵션만 on하여 값 입력 => result 페이지에 입력값 중 랜덤으로 옵션별 1개 골라줌
- 유효성 검사 -> 옵션 스위치를 하나도 고르지 않거나, 옵션 스위치 on한 상태로 입력값을 다 채우지 않은 경우 에러 메세지 출력

<img src="https://user-images.githubusercontent.com/116494960/218043929-cfafef4a-3f8c-4a6e-b891-0dc3c1f5e6f7.jpg"/>

### ootd 페이지
- 월별 게시물 조회 기능 구현

<img src="https://user-images.githubusercontent.com/116494960/217753992-e2b6e6cd-0691-4b3b-815b-44c0258d4de8.png"/>

### addmemo 페이지
- 유효성 검사(제목,사진,내용 중 하나라도 입력하지 않은 경우 경고창 출력)
- 캘린더(react-calender 라이브러리 사용)에서 날짜 선택 기능 구현
- 사진 업로드 기능 구현(api 사용)

<img src="https://user-images.githubusercontent.com/116494960/217754758-c8c48169-41d5-493c-b112-8f4ab8841b24.png"/>

### detail, editmemo 페이지
- 게시물 수정 및 삭제 기능 구현

