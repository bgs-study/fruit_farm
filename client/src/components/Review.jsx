import {useState, useContext} from "react";
import styled from 'styled-components';
import Modal from "../components/Modal";
import { DetailContext } from "../pages/DetailPage"

const ReviewItems = ({review,all}) =>{

    return review.map((value, idx) => {
        if(idx >5){if(!all){return;}}
        return( 
            
            <ReviewItem key = {`reveiw-${idx}`} className = {value.id} >
                <p className="reveiwItem id" key = {`${value.id}-${idx}`}>{value.id}</p>
                <p className="reveiwItem name" key = {`${value.name}-${idx}`}>{value.name}</p>
                <p className="reveiwItem content" key = {`content-${idx}`}>{value.content}</p>
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
                <ReviewContent len={review.length}> 
                    <ReviewItems review={review}/>
                </ReviewContent>
                {review.length > 6 && <button onClick={()=>setModalOpen(true)}>모두보기</button>}
                { modalOpen &&
                    <Modal setModalOpen={setModalOpen}>
                        <ModalLayout>
                            <ModalTitle>
                                <p>리뷰</p>
                                <p>후기 {review.length}개</p>
                            </ModalTitle>
                            <ModalContent >
                                <ReviewItems review={review} all/>
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

const ReviewContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: ${(props) => props.len > 6 ? `repeat(3,1fr)` : `repeat(${Math.ceil(props.len/2)},1fr)`};
    gap: 10px 20px;
`; 

const ReviewItem = styled.div`
    border: 1px solid black;
    .reveiwItem {
        margin : 5px;
    }
    .id{
        font-size: 1rem;
        font-weight: bold;
    }
    .name{
        font-size: 0.7rem;
    }
    .content{
        font-size: 0.8rem;
    }
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
