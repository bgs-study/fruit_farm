import { ImStarFull } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components'
import * as userApi from "../lib/userApi";
import { StyledSubTitle,SubmitButton } from '../styles/Styled'

const RatingBox = styled.div`
  margin: 0 auto;
  padding-top: 1rem;

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

const CreateReview = ({id, farmId}) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  let starScore = clicked.filter(Boolean).length;
  
  const handleStarClick = index => {
    let clickStates = [...clicked];
    clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
    setClicked(clickStates);
   };

   const postReviewDataHandler = async(e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const rating = starScore;
    const farm_id = farmId;
    try{
      await userApi.post(`/api/review/${id}`, {
        content,
        rating,
        farm_id
      })
      navigate('/mypage/review');
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <hr />
    <StyledSubTitle marginTop>농장 체험 경험은 어떠셨나요?</StyledSubTitle>
    <RatingBox>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'click'}
      onClick={() => handleStarClick(item)}
      />)
      }
    </RatingBox>
    <form onSubmit={postReviewDataHandler}>
      <StyledTextarea name="content" placeholder="후기를 작성해주세요"></StyledTextarea><br />
      <SubmitButton type="submit">저장 하기</SubmitButton>
    </form>
    </div>
    
  )
}

export default CreateReview;