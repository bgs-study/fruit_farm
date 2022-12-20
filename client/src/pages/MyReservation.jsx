import styled from "styled-components";
import {useState} from 'react';
// 목데이터
import axios from 'axios';
import { useEffect } from 'react';

const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`

const StyledList = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3%;
  box-sizing: border-box;
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`

const StyledImageWrap = styled.div`
  border: 1px solid #000;
  width: 150px;
  height: 150px;
  margin-right: 20px;
`

const MyReservation = () => {
  const [resrvedata, setData] = useState(null)
  
  const getReservationData = async() => {
    await axios.get("/reservationData.json").then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }

  useEffect(() => {
    getReservationData();
  },[])


  return (
    <>
      <h1>예약조회</h1>
      <StyledNavWrapper>
      <div>
        <button>전체</button>
        <button>예약완료</button>
        <button>예약취소</button>
        <button>체험완료</button> 
      </div>
      <select>
        <option>지난 3개월</option>
        <option>지난 6개월</option>
        <option>지난 1년</option>
      </select>
      </StyledNavWrapper>
        <StyledList>
          {resrvedata.reservation.map}
            <StyledListInner>
                <StyledImageWrap>농장이미지</StyledImageWrap>
                <div>
                    <div>
                    <h3>농장명 / 체험명</h3> 
                    <div>예약완료</div> 
                    </div>
                    <div>날짜</div>
                    <div>4명</div>
                    <div>결제금액 : 23,000원</div>
                </div>
                </StyledListInner>
            <div>
                <button>더보기</button>
                <button>예약취소</button>
            </div>
        </StyledList>
        </>
    )
}

export default MyReservation;