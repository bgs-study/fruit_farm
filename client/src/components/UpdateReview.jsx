import { ImStarFull } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components'
import * as userApi from "../lib/userApi";
import { getToken } from '../utils/utils';
import { StyledSubTitle, SubmitButton} from '../styles/Styled';

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
const StyledTextarea = styled.textarea`
  background : #fff;
  border-radius: 5px;
  margin-top: 0.5rem;
  width: 50%;
  height: 100px;
`

const UpdateReview = ({id}) => {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewId, setReviewId] = useState(null);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const textRef = useRef();
    let starScore = clicked.filter(Boolean).length;
  
    const getReviewData = async () => {
      const token = getToken();
      const res = await userApi.get(`/api/review`, {
        headers: {
          authorization: token,
        },
      });
      const result  = res.data.filter(item => item.reserveInfo.id === Number(id));
      setReviewContent([result[0].review.content]);
      setRating(result[0].review.rating);
      setReviewId(result[0].review.id);
  };
  
    const showRating = () => {
      let clickStates = [...clicked];
      clickStates.map((i, idx) => clickStates[idx] = idx <= rating-1 ? true : false)
      setClicked(clickStates);
    }
  
    useEffect(()=>{
      getReviewData();
    },[]);

    useEffect(()=>{
      showRating();
    },[rating]);
  
    const handleStarClick = index => {
      let clickStates = [...clicked];
      clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
      setClicked(clickStates);
     };
  
     const updateReviewHandler = async(e) => {
      e.preventDefault();
      const content = textRef.current.value;
      const rating = starScore;
      try {
        await userApi.patch(`/api/review/${reviewId}`, {
          content,
          rating
        });
        alert('수정되었습니다.');
        navigate('/mypage/review');
      } catch (err) {
        console.log(err.response.data.Error);
        alert('문제가 발생했습니다. 다시 시도해 주세요.');
      }
    };
    
    return (
      <div>
        <hr />
        <StyledSubTitle marginTop>수정할 내용을 작성해 주세요</StyledSubTitle>
      <RatingBox>
        {[0,1,2,3,4].map(item =>
        <ImStarFull 
        key={item}
        className={clicked[item] && 'click'}
        onClick={() => handleStarClick(item)}
        />)
        }
      </RatingBox>
      <form onSubmit={updateReviewHandler}>
        <StyledTextarea 
          name="content"
          defaultValue={reviewContent}
          ref={textRef}
          maxLength={50}
        ></StyledTextarea><br />
        {reviewContent.length >= 50 && '50자 까지 작성이 가능합니다.'}
        <SubmitButton type="submit">수정</SubmitButton>
      </form>
      </div>
    )
  }

  export default UpdateReview;