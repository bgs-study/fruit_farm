import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ImStarFull } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { Link } from 'react-router-dom';
import { 
  ConfirmButton, 
  DeleteButton, 
  StyledTitle, 
  StyledConfirmModal 
} from '../styles/Styled';
import apple from '../assets/apple.png';
import { SkeletonList } from './Skeleton';

const StyledFarmTitle = styled.h3`
  margin-bottom: 1%;
  display: inline-block;
`

const StyledContent = styled.div`
  width:70%;

  >p {
    margin-bottom: 0;
  }
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
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`

const StyledImageWrap = styled.div`
  width: 30%;
  height: 100%;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;

  >img {
    width: 100%;
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

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }
  .click {
    color: #f4d815;
  }
`
const StarRate = ({rating}) => {
  const [clicked, setClicked] = useState([true,true,true,true,true]);
  
  const handleStarClick = () => {
    let clickStates = [...clicked];
    clickStates.map((i, idx) => clickStates[idx] = idx <= rating-1 ? true : false)
    setClicked(clickStates);
   };

  useEffect(() => {
    handleStarClick();
  },[])

  return (
    <RatingBox>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'click'}
      />)
      }
    </RatingBox>
  )
}

const MyReviewTable = () => {
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(null);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
  const [loading, setLoading] = useState(true);
    
  const getReviewData = async() => {
    try {
      const token = getToken();
      const res = await userApi.get(`/api/review`, {
        headers: {
          authorization: token,
        },
      });
      const result = res.data.sort((a, b) => {
				let aTime = a.review.createdAt;
				let bTime = b.review.createdAt;
				if (aTime > bTime) return -1;
				if (aTime === bTime) return 0;
				if (aTime < bTime) return 1;
			});
      setData(result);
    setLoading(false);
    }catch(err) {
      console.log(err.response.data.Error);
    }
  }

  useEffect(() => {
    getReviewData();
  },[])

  const ShowReviewList = () => {
    const deleteReviewHandler = async(e) => {
      try{
        await userApi.delete(`/api/review/${dataIndex}`);
        alert('삭제되었습니다.');
        dispatch(closeModal());
        getReviewData();
      }catch(err){
        console.log(err.response.data.Error);
        alert('문제가 발생하였습니다. 다시 시도해 주세요');
      }
    };

    return (<>
      {data.map((item, index) => { 
        const {review, reserveInfo, time} = item;
        const start_time = time.start_time.slice(0,5);
        const end_time = time.end_time.slice(0,5);
        const title_img = (time.url).split(',')[0];
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={title_img} alt="농장사진"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledFarmTitle>
                  {time.farmName}
                </StyledFarmTitle>
                <p>{time.date} {start_time} - {end_time}</p>
                <p>인원: {reserveInfo.personnel}명</p>
                <p>{review.content}</p>
                <StarRate rating={review.rating}/>
              </StyledContent>
            </StyledListInner>
            <div>
            <ConfirmButton>
              <Link to ={`/mypage/updatereview/${reserveInfo.id}`}>
                수정
              </Link>
            </ConfirmButton>
            <DeleteButton 
              name={review.id}
              onClick={(e) => {
                dispatch(showModal())
                setDataIndex(e.target.name)
              }}>삭제
              </DeleteButton>
            </div>
          </StyledList>
          )
        })}  
      {modalOpen && <ModalContainer w="320px" h="150px">
        <StyledConfirmModal>
          <p>리뷰를 삭제하시겠습니까?</p>
          <DeleteButton onClick={(e) => {deleteReviewHandler(e)}}>삭제</DeleteButton>
          <ConfirmButton onClick={() => dispatch(closeModal())} reject>취소</ConfirmButton>
          </StyledConfirmModal>
      </ModalContainer>}
    </>
    );
  };

  return (
    <>
    <StyledTitle>리뷰 목록</StyledTitle>
    {loading 
    ? <>
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      <SkeletonList />
      </> 
    : data.length > 0 
    ? <ShowReviewList /> 
    : <StyledNotData>
        <img src={apple} alt="" />
        <h4>회원님의 후기 내역이 없습니다.</h4>
      </StyledNotData>
    }
    </>
  )
}

export default MyReviewTable;