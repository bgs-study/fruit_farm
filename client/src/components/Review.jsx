import {useState, useContext} from 'react';
import styled, {css} from 'styled-components';
import Modal from '../components/Modal';
import { DetailContext } from '../pages/DetailPage'

const ReviewItems = ({review,showAll}) =>{
    const [tab, setTab] = useState(true);
    const MaxLength = 20;

    return review.map((value, idx) => {
        const {id, name,content}= value;
        const isTextOverflow = MaxLength < value.content.length;
        
        if (idx >5) if(!showAll) return;
        return(      
            <ReviewItem key = {`reveiw-${idx}`} >
                <ReviewId  key = {`${value.id}-${idx}`}>{id}</ReviewId>
                <ReviewName key = {`${value.name}-${idx}`}>{name}</ReviewName>
                <ReviewContent active={`${tab === true ? 'active' : ''}`} key = {`content-${idx}`}>{content}</ReviewContent>
                { isTextOverflow && <button onClick={()=> setTab(!tab)} >더보기</button>}
            </ReviewItem>
        );
    })
}

const Review = ()=>{
    const {detailData : data} = useContext(DetailContext);
    const {review} = data;
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <p>후기</p>
            <ReviewContainer >
                <ReviewDiv len={review.length}> 
                    <ReviewItems review={review}/>
                </ReviewDiv>
                {review.length > 6 && <button onClick={()=>setModalOpen(true)}>모두보기</button>}
                { modalOpen &&
                    <Modal setModalOpen={setModalOpen}>
                        <ModalLayout>
                            <ModalTitle>
                                <p>리뷰</p>
                                <p>후기 {review.length}개</p>
                            </ModalTitle>
                            <ModalContent >
                                <ReviewItems review={review} showAll/>
                            </ModalContent>
                        </ModalLayout>
                    </Modal>
                }
            </ReviewContainer>
        </>
    );
}

const ReviewContainer  = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
`;

const ReviewDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: ${(props) => props.len > 6 ? `repeat(3,1fr)` : `repeat(${Math.ceil(props.len/2)},1fr)`};
    gap: 10px 20px;
`; 

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
    border  : 1px solid black;
    padding : 5px;
    overflow: hidden;   
    p {  margin : 5px; }
`;

const ModalLayout = styled.div`
    display: felx;
    margin-top : 5%;
`;
const ModalTitle = styled.div`
    width: 30%;
    margin-right:5%;
`;
const ModalContent =styled.div`
    width: 60%;
    height: 420px;
    overflow-y:auto;
    overflow-x:hidden;
`;

export default Review;
