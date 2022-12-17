**# fruit_farm**


<hr />

# (과일 체험 농장)
- 과일 농장 체험을 위한 예약을 진행하는 서비스.


## 서비스 구성 안내

## 1. 서비스 소개

- 기술 스택 (Bulma css, node, mongodb 등)
- 웹서비스에 대한 자세한 개요 등

## sever 폴더 구조 
.
|-- config
|   `-- config.json : 데이터베이스 설정파일, 사용자 이름, DB이름, 비밀번호
|-- controller
|-- db
|-- middleware     
|-- migrations: DB 변화하는 과정들을 추적해나가는 정보로, 실제 DB에 반영 및 변화 취소 가능   
|-- models : DB 각 테이블의 정보 및 필드타입 정의
|   `-- index.js   
|-- package.json   
|-- seeders: 테이블에 기본 데이터를 넣고 싶은 경우에 사용        
`-- server.js