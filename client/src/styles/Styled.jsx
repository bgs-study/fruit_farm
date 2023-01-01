import styled,{css} from 'styled-components';

//memo 가영 : 로그인, 회원가입 등 큰 버튼
export const SubmitButton = styled.button`
    border: none;
    background: #83d644;
    border-radius: 10px;
    margin-top: 40px;
    padding: 1rem 3rem;
    color: #fff;
    font-weight: 700;

    ${props => props.reject && css`
    border:1px solid #b1b0ac;
    background: #b1b0ac3b;
    color:#b1b0ac;
`}

    +button {
        margin-left: 6px;
    }

`
//memo 가영 : 수정, 삭제 등 작은 버튼
//강조하고 싶지 않은 버튼에 props로 reject 전달
export const ConfirmButton = styled.button`
    border:1px solid #f4d815;
    border-radius: 10px;
    color: #d1b80d;
    font-weight: 500;
    background: rgba(244,216,21,0.18);

    ${props => props.reject && css`
        border:1px solid #b1b0ac;
        background: #dbdad43b;
        color: #b1b0ac;
    `}

    +button {
        margin-left: 6px;
    }
    
    > a {
        color: #d1b80d;
    }
    
`
//memo 가영 : 예약조회페이지 - 상태목록
//클릭된 버튼에 props로 clicked 전달
export const StatusButton = styled.button`
    border-radius: 5px;
    border:1px solid #b1b0ac;
    background: #dbdad43b;
    color:#d1b80d;

    ${props => props.clicked && css`
        border:1px solid #f4d815;
        background: #f4d815;
        color:#fff;
        font-weight: 500;
    `}

    +button {
        margin-left: 6px;
    }
`
//memo 가영 : 예약조회페이지 - 상태셀렉트 박스
export const StatusSelect = styled.select`
    border-radius: 5px;
    border:1px solid #b1b0ac;
    background: #fff;
    color:#d1b80d;
    border-radius: 5px;
    padding: 0.2rem 0.4rem;

    select option:checked {
        background: #83d644;
    }
`
//memo 지혜 : red삭제버튼
export const DeleteButton = styled.button`
    border: 1px solid red;
    border-radius: 10px;
    color: red;
    font-weight: 500;
    background-color:rgba(255, 0, 0, 0.18);

    ${props => props.reject && css`
        border:1px solid #b1b0ac;
        background: #b1b0ac3b;
        color:#b1b0ac;
    `}

    +button {
        margin-left: 6px;
    }
`
// memo 가영: 확인을 묻는 모달
export const StyledConfirmModal = styled.div`
  text-align: center;
`

//memo 지혜 : 일반 블랙/화이트 버튼
export const NormalButton = styled.button`
    border : 1px black solid;
    border-radius: 10px;
    color : black;
    font-weight: 500;
    background-color : white;
    padding: 0.2rem 0.4rem;

    +button {
        margin-left: 6px;
    }
`
//memo 가영 : input
export const Input = styled.input`
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
    margin-top: 2%
`
//memo 가영 : 페이지 타이틀
export const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 2%;
  display: inline-block;
`
//memo 가영 : 소제목
export const StyledSubTitle = styled.h5`
    font-weight: 600;

    ${props => props.marginBottom && css `
        margin-bottom: 1.8rem;
    `}

    ${props => props.marginTop && css `
        margin-top: 2rem;
    `}
`
//memo 가영 : 콘텐츠 글자
export const StyledParagraph = styled.p`
    margin-bottom: 10px;
`

//memo 가영 : 예약조회, 후기조회 등 리스트의 이미지
export const StyledImageWrap = styled.div`
  width: 23rem;
  height: 10rem;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;

  >img {
    width: 100%;
    height: auto;
  }

  ${props => props.modalImg && css`
  width: 11rem;
  height: 7rem;
`}
`
//memo 지혜 : 페이지 wrapper
export const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 10px;
`;
//memo 지혜 : 페이지 버튼
export const PageBtn = styled.button`
	background-color: white;
    font-weight: 700;
	color: black;
    border: black solid 1px;
    border-radius : 5px;
    width: 30px;
    height: 30px;

    &.active {
        background-color: #b1b0ac;
    }

    ${props => props.disabled && css`
        color: darkgray;
        background-color: lightgray;
        opacity: 0.5;
    `}
`
// memo 지혜 : 컨텐트 컨테이터
export const ContentContainer = styled.div`
    display: block;
    width: 100%;
    margin: 8% 0;
`
//memo 지혜 : 배경 흰색, 테투리 green
export const WhiteGreenBtn = styled.button`
    border: 2px green solid;
    border-radius: 10px;
    color: green;
    font-weight: 500;
    background : white;
    padding: 0.2rem 0.3rem;

    +button {
        margin-left: 6px;
    }
`