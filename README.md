# Scene's Pick

## 프로젝트 개요

부모님 제주 여행에 맞춰 제주에 가볼만한 곳을 카카오 지도 API를 활용해 기록

## 기술 스택

Front: EJS, Vanilla JS
Back: Express JS
Server: Ubuntu (GCP), Nginx
Version: Git

## 기능

1. 카카오 지도 API에 가게 정보 마커

  위도, 경도 값을 이용해 카카오 지도에 가게 위치 마킹\
  마커 클릭 시 가게 정보, Naver Link 연결

2. Admin Page

  Admin Page를 구현해 가게 정보 등록 및 수정, 삭제 기능\
  가게 정보 리스트에 대해 Pagination\
  View에서 Table로 가게 정보 확인
  
3. 지도 외 테이블로 볼 수 있도록 구현

  서비스 제공 시 지도가 아닌 테이블의 형태로 가게 정보를 볼 수 있도록 구현
