import {useState, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import { DetailContext } from '../pages/DetailPage'
import ModalContainer from './../components/Modal';
import { ConfirmButton, StyledSubTitle, ContentContainer, StyledParagraph} from '../styles/Styled';
import { ImStarFull } from 'react-icons/im';
import styled, {css} from 'styled-components';

const ReviewDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: ${(props) => props.len > 6 ? `repeat(3,1fr)` : `repeat(${Math.ceil(props.len/2)},1fr)`};
    gap: 10px 20px;
`; 
const ReviewSubTitle = styled(StyledSubTitle)`
    margin : 18% 0 10%;
`;
const ReviewTotalNum = styled(StyledParagraph)``;
const ReviewId = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;
const ReviewName = styled.p`
    font-size: 0.7rem;
`;
const ReviewContent= styled.p`
    display:block;
    width:100%;
    font-size: 0.8rem;
    ${props =>props.active && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
    `};
`;
const ReviewItem = styled.div`
    border  : 2px solid lightgray;
    border-radius : 10px;
    padding : 10px;
    overflow: hidden; 
    :not(:last-child) { margin-bottom : 10px; }  
    > button {margin-top: 10px;}
    > p {  margin : 5px; }
`;
const ModalLayout = styled.div`
    display: felx;
`;
const ModalTitle = styled.div`
    width: 30%;
    padding-left: 5%;
    margin-right: 5%;
`;
const ModalContent =styled.div`
    width: 60%;
    height: 450px;
    margin-top : 5%;
    overflow-y:auto;
    overflow-x:hidden;
`;
const ShowAllReviewBtn = styled(ConfirmButton)`
    margin-top : 1%;
`;
const RatingBox = styled.div`
    margin: 0 auto;
    & svg {
        color: #C4C4C4;
        cursor: pointer;
    }
    .black {
        color: yellow;
    }
`;
const Span = styled.span`
    font-size: 0.7rem;
`;

const maskingName = (name) =>{
    if(name.length > 2) {
        const originName = name.split('');
        originName.forEach((splitName,i) =>{
            if( i === 0 || i === originName.length -1) return;
            originName[i] = '*';
        })
        const joinNmae=originName.join();
        return joinNmae.replace(/,/g,'');
    }else{
        const patter = /.$/;
        return name.replace(patter,'*');
    }
}

const ReviewItems = ({review,showAll}) =>{
    const [tab, setTab] = useState(true);
    const MaxLength = 20;

    return review.map((value, idx) => {
        const {id, name, content, date, rating} = value;
        const isTextOverflow = MaxLength < value.content.length;
        
        if (idx >5) if(!showAll) return;
        return(      
            <ReviewItem key = {`reveiw-${idx}`} >
                <ReviewId  key = {`${id}-${name}`}>{maskingName(name)}</ReviewId>
                <RatingBox>
                    {[0,1,2,3,4].map(item =>
                        item < rating ?
                            <ImStarFull 
                                key={item}
                                className={'black'}
                            />  
                            : <ImStarFull key={item}/>  
                    )}
                    <Span>({rating}점)</Span>
                </RatingBox>
                <ReviewName key = {`${date}-${idx}`}>{date.slice(0,-8).split('T').join(' ')}</ReviewName>
                <ReviewContent active={`${tab === true ? 'active' : ''}`} key = {`content-${idx}`}>{content}</ReviewContent>
                { isTextOverflow && <ConfirmButton onClick={()=> setTab(!tab)} >더보기</ConfirmButton>}
            </ReviewItem>
        );
    })
}

const Review = ()=>{
    const {reviewData : review} = useContext(DetailContext);
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);
    
    return (
        <ContentContainer>
            <StyledSubTitle>후기</StyledSubTitle>
            <hr />
            <div>
                { review && (
                    <>
                        <ReviewDiv len={review.length}> 
                            <ReviewItems review={review}/>
                        </ReviewDiv>
                        {review.length > 6 && <ShowAllReviewBtn onClick = {() => dispatch(showModal())}>모두보기</ShowAllReviewBtn>}
                    </>
                    )
                }
                { modalOpen &&
                    <ModalContainer h='80%'>
                        <ModalLayout>
                            <ModalTitle>
                                <ReviewSubTitle>전체 후기</ReviewSubTitle>
                                <ReviewTotalNum>총 {review.length}개</ReviewTotalNum>
                            </ModalTitle>
                            <ModalContent >
                                <ReviewItems review={review} showAll/>
                            </ModalContent>
                        </ModalLayout>
                    </ModalContainer>
                }
            </div>
        </ContentContainer>
    );
}

export default Review;
