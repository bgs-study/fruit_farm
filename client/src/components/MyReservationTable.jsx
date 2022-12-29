import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Moment from 'moment';
import styled, {css} from 'styled-components';
import { showModal, closeModal } from '../store/ModalSlice';
import ModalContainer from './Modal';
import Location from './Location';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import {SkeletonList} from "./Skeleton";
import apple from '../assets/apple.png';
import {
  StyledConfirmModal, 
  ConfirmButton, 
  StyledImageWrap, 
  StyledTitle, 
  StyledSubTitle,
  StatusButton,
  StatusSelect,
  SubmitButton,
  DeleteButton,
} from '../styles/Styled';


const StyledTitleWrap = styled.div`
  display:flex;
  align-items:center
`
const StyledContent = styled.div`
  width:70%;

  > p {
    margin-bottom: 0;
    color: #777;
  }

  > p > span {
    font-weight: bold;
    color: #000;
  }
`

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
  margin-bottom: 2%;

  ${props => props.small && css`
    width: 97%;
 `}
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`
const StyledStatusLabel = styled.span`
  border: none;
  background: #83d644;
  border-radius: 5px;
  padding: 0 0.2rem;
  color: #fff;
  margin: 0 0 0.5rem 0.5rem;
  font-size: 0.8rem;

  ${props => props.marginTop && css`
   margin: 0.5rem 0 0 0;
  `}
`
const StyledButtonWrap = styled.div`
 display: flex;
 flex-direction: column;

 button + button {
  margin: 0.2rem 0 0 0;
 }
`
const StyledSelectWrap = styled.div`
 display: flex;
 flex-direction:column;
 margin-top: 3rem;

 >label {
  margin-bottom: 0.5rem;
 }
`
const StyledRefundEl = styled.h3`
 text-align: center;
 margin-top: 3rem;

 > span {
  color: red;
 }
`
const StyledCancleButtonWrap = styled.div`
 display: flex;
 justify-content: center;
 
 ${props => props.marginTop && css`
  margin-top: 3rem;
 `}

 button + button {
  margin-left: 0.2rem 0 0 0;
 }
`
const StyledPayWrap = styled.div`
 display: flex;
 justify-content: space-between;

 > p + p {
  font-weight: bold;
 }
`
const StyledNotData = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 20px;
margin-top: 50px;

img {
  height: 50px;
  margin-bottom: 20px;
}
`  

const initialState = {
  cancleModal: false,
  confirmModal: false,
  detailModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CANCLE':
      return {
        ...state,
        cancleModal: true,
        detailModal: false,
      };
    case 'CONFIRM':
      return {
        ...state,
       confirmModal: true,
      };
    case 'DETAIL':
      return {
        ...state,
        detailModal: true,
        cancleModal:false,
      };
    case 'CLOSE': 
     return {
      cancleModal: false,
      confirmModal: false,
      detailModal: false,
      reviewModal: false,
     }
    default: return state;
  }
}

const MyReservationTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataIndex, setDataIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);
  const modalDispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);

  const [statusOption , setStatusOption] = useState('전체');
  const [dateOption , setDateOption] = useState('지난 3개월');
  const statusList = ["전체", "예약대기", "예약완료", "예약취소", "체험완료"];

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    const result = res.data.sort((a, b) => {
      let aTime = a.info.date;
      let bTime = b.info.date;
      if (aTime > bTime) return -1;
      if (aTime === bTime) return 0;
      if (aTime < bTime) return 1;
    });
    setOriginalData(result);
    setFilteredData(result);
    setLoading(false);
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const  filterData= () => {
    let filteredData = [...originalData];
    const today =  Moment().format('YYYY-MM-DD');

    if(statusOption !== "전체" ){
      filteredData = filteredData.filter(item => item.reserve.status === statusOption);
    }

    if(dateOption === 'threeMonthAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('3', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'sixMonthAgo'){
      filteredData = filteredData.filter(item =>
        (Moment().subtract('6', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'oneYearAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('1', 'years').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }
    setFilteredData(filteredData);
  };

  useEffect(()=> {
    filterData();
  },[statusOption, dateOption]);

  const ShowDefault = () => {
    return <>
        <StyledTitle>예약조회</StyledTitle>
        <StyledNavWrapper>
        <div>
          {statusList.map((state) => (
            <StatusButton 
              key={state} 
              onClick={()=>
              setStatusOption(state)}
              clicked = {statusOption === state ? true : false}
              >
              {state}
            </StatusButton>
          ))}
        </div>
        <StatusSelect
          value={dateOption} 
          onChange={(e) => setDateOption(e.target.value)}>
					<option value="threeMonthAgo">지난 3개월</option>
					<option value="sixMonthAgo">지난 6개월</option>
					<option value="oneYearAgo">지난 1년</option>
				</StatusSelect>
      </StyledNavWrapper>
    </>
  };

  const ShowResrvation = () => {
    return (<>
      {filteredData.map((reservation , index) => { 
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        const title_img = (info.url).split(',')[0];
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={title_img} alt="농장사진"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledTitleWrap>
                  <StyledSubTitle
                    style={{
                      textDecoration 
                      : reserve.status === '예약취소' 
                      ? 'line-through' 
                      : 'none'}}>
                      {info.name}
                  </StyledSubTitle>
                  <StyledStatusLabel>
                    {reserve.status}
                  </StyledStatusLabel>
                </StyledTitleWrap>
                <p>체험 날짜 <span>{info.date}</span></p>
                <p>체험 시간 <span>{start_time} -  {end_time}</span></p>
                <p>인원 <span>{reserve.personnel}</span>명</p>
                <p>결제금액 <span>{(reserve.total_price).toLocaleString()}</span>원</p>
              </StyledContent>
            </StyledListInner>
            <StyledButtonWrap>
              <ConfirmButton
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name);
                modalDispatch(showModal());
                dispatch({type: 'DETAIL'})
                }}>
                더보기
              </ConfirmButton>
              {(reserve.status === '체험완료' && !reserve.review) &&
                <ConfirmButton>
                  <Link to={`/mypage/writereview/${reserve.id}`}>
                    후기작성
                  </Link>
                </ConfirmButton>
              }
              {(reserve.status === '예약대기' || reserve.status === '예약완료') && 
                <DeleteButton 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name);
                    modalDispatch(showModal());
                    dispatch({type: 'CANCLE'})
                  }}
                >
                  예약취소
               </DeleteButton>
              }
            </StyledButtonWrap>
          </StyledList>
          )
        })}
      </>  
    );
  };

  const DetailReservation = () => {
    const filterDataArr = [filteredData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(reservation => {
          const {info, reserve} = reservation || {};
          const start_time = info.start_time.slice(0,5);
          const end_time = info.end_time.slice(0,5);
          const title_img = (info.url).split(',')[0];
          return (
            <div key={`${dataIndex}`-`${info.id}`}>
              <StyledList small>
                <StyledTitleWrap>
                  <StyledImageWrap modalImg>
                    <img src={title_img} alt="농장사진"/>
                  </StyledImageWrap>
                    <div>
                      <h3 style={{
                      textDecoration : reserve.status === '예약취소' 
                      ? 'line-through' 
                      : 'none'}}>{info.name}</h3>
                      <StyledStatusLabel marginTop>
                        {reserve.status}
                      </StyledStatusLabel>
                    </div>
                </StyledTitleWrap>
              </StyledList>
                  <StyledSubTitle marginTop>예약정보</StyledSubTitle>
                  <hr />
                    <StyledContent>
                      <p>체험 날짜 <span>{info.date}</span></p>
                      <p>체험 시간 <span>{start_time} - {end_time}</span></p>
                      <p>체험 인원 <span>{reserve.personnel}명</span></p>
                    </StyledContent>
                    <br />
                    {info.address !== null && <Location location={info.address}/>}
                    <hr />
                    <StyledPayWrap>
                      <p>결제수단</p>
                      <p>{reserve.payment === 'card' && '카드결제'}</p>
                    </StyledPayWrap>
                    <StyledPayWrap>
                      <p>결제금액 </p>
                      <p>{reserve.total_price.toLocaleString()}원</p>
                    </StyledPayWrap>
                {(reserve.status === "예약완료" || reserve.status === "예약대기") && 
                <SubmitButton 
                  onClick={() => {
                    modalDispatch(showModal());
                    dispatch({type: 'CANCLE'})
                  }}> 
                    예약취소
                </SubmitButton>}
            </div>)
        })}
      </>
    )
  }

  const cancleResevationHandler = async(e) => {
    const id = e.target.name;
    try {
      await userApi.patch(`/api/reserve/${id}`, {
        status: '예약취소',
      }); 
      alert('예약이 취소되었습니다.')
      modalDispatch(closeModal());
      getReservationData();
    } catch (err) {
      console.log(err.response.data.Error)
    }
  }

  const CancleReservationPage = () => {
    const filterDataArr = [filteredData[dataIndex]];

    return (
      <>
      {filterDataArr.map(reservation => {
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        const title_img = (info.url).split(',')[0];
        return (
         <div key={`${dataIndex}-${info.id}`}>
          <StyledListInner>
              <StyledImageWrap>
                <img src={title_img} alt="농장사진" />
              </StyledImageWrap>
            <StyledContent>
                <h4>{info.name}</h4>
                <p>{info.date} | {start_time}-{end_time}</p>
                <p>인원 {reserve.personnel}명</p>
                <p>결제금액 {reserve.total_price.toLocaleString()}원</p>
            </StyledContent>
          </StyledListInner>
          <StyledSelectWrap>
            <label>취소 사유를 선택해 주세요.</label>
            <StatusSelect>
              <option>취소 후 다시 예약하기 위함</option>
              <option>상품이 마음에 들지 않음</option>
              <option>다른 농장으로 변경하기 위함</option>
            </StatusSelect>
          </StyledSelectWrap>
          <hr />
          <StyledRefundEl>
            최종환불금액: 
            <span>{reserve.total_price.toLocaleString()}원</span>
          </StyledRefundEl>
          <StyledCancleButtonWrap>
            <SubmitButton 
              onClick={() => {
                dispatch({type: 'DETAIL'})
              }}
                reject
              >
                이전
            </SubmitButton>
            <SubmitButton onClick={() => {
              dispatch({type: 'CONFIRM'})
            }}>
              예약취소
            </SubmitButton>
          </StyledCancleButtonWrap>
          {state.confirmModal && modalOpen && 
            <ModalContainer w="320px" h="170px">
              <StyledConfirmModal>
                <p>예약을 취소하시겠습니까?</p>
                <StyledCancleButtonWrap marginTop>
                  <DeleteButton 
                  name={reserve.id}
                  onClick={(e) => 
                  cancleResevationHandler(e)}>
                    확인
                  </DeleteButton>
                  <ConfirmButton 
                  onClick={() => {
                    dispatch({type: 'CLOSE'})
                    modalDispatch(closeModal())
                  }}
                  reject
                  >
                    취소
                  </ConfirmButton>
                </StyledCancleButtonWrap>
              </StyledConfirmModal>
          </ModalContainer>}
        </div>
      )}
    )} 
    </>   
    )
  }

  return (
    <>
     <ShowDefault/>
    {loading 
    ? <>
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      </> 
    : filteredData.length > 0 
    ? <>
    <ShowResrvation /> 
    {state.detailModal && modalOpen && 
        <ModalContainer w="500px" h="510px">
          <DetailReservation />
        </ModalContainer>
    }
    {state.cancleModal && modalOpen && 
      <ModalContainer w="500px" h="510px">
        <CancleReservationPage/>
      </ModalContainer>
    }
    </>
    : <StyledNotData>
      <img src={apple} alt="" />
      <h4>회원님의 예약 내역이 없습니다.</h4>
     </StyledNotData>
    }
    </>
  )
}

export default MyReservationTable;