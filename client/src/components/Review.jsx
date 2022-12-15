import styled from 'styled-components';

const Review = ({review})=>{
    
    return (
        <>
            <p>후기</p>
            <ReviewContainer >
                <ReviewContent len={review.length}> 
                    {
                        review.map((value, idx) => {
                            if(idx >5){return;}
                            return( 
                                <ReviewDiv key = {`reveiw-${idx}`} className = {value.id} >
                                    <p className="reveiwItem id" key = {`${value.id}-${idx}`}>{value.id}</p>
                                    <p className="reveiwItem name" key = {`${value.name}-${idx}`}>{value.name}</p>
                                    <p className="reveiwItem content" key = {`content-${idx}`}>{value.content}</p>
                                </ReviewDiv>
                            );
                        })  
                    }
                </ReviewContent>
                {review.length > 6 && <button>모두보기</button>}
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

const ReviewDiv = styled.div`
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
export default Review;