import React,{useState} from 'react';
import styled from 'styled-components';
import Calender from "./ReactCalender";
import Location from "./Location";
import Review from "./Review";


const Detail = ({ data }) => {
    // const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [headCount, setHeadCount] = useState(1);
    const [timeBtnActive, setTimeBtnActive] = useState("");

    const handleHeadCount = (e) => {
        setHeadCount(e.target.value);
    };
    const handleTimeSelect = (e) => {
        console.log(e.target.value);
        setTimeBtnActive(e.target.value);
    };

    // useEffect(() =>{
    //     setPrice(data.price);
    // },[]);

    // useEffect (() => {
    //     setTotalPrice(selected*price);
    // },[selected])

    return (
        <div>
            {
                data &&
    
                <DetailContainer key={`${data.title}-${new Date()}`}>
                        <div className="header">
                            <h1 className="title">{data.title}</h1>
                            <p>{data.location}</p>
                            <img src="" alt={`${data.title}이미지`}/>
                        </div>
                        <Content>
                            <Inform>
                                <h3>{data.grade}점</h3>
                                <p>{data.description}</p>
                                <Period className="reservationTime">
                                    <Calender period ={data.period} className="calender"></Calender>
                                    <TimButtonContainer>
                                        { 
                                            data.times.map( (time,idx)=>{
                                                return <div >
                                                    <TimeButton className={"btn" + (idx == timeBtnActive ? " active" : "")} 
                                                    value ={idx} onClick={handleTimeSelect}>{idx+1}타임  {time}</TimeButton>
                            
                                                    </div>
                                            })
                                        }                                        
                                    </TimButtonContainer>
                                </Period>
                                <Review review={data.review}></Review>
                                <Location latitude ={data.latitude} longitude={data.longitude} ></Location>
                                <Company>
                                    <p>업체정보</p>
                                    {
                                        Object.entries(data.company).map((values,idx) => {
                                            return <p key={`idx${idx}-${values[0]}`}>{`${values[0]}`} : {`${values[1]}`}</p>
                                        })
                                    }
                                </Company>
                                
                            </Inform>
                            
                            <Form>
                                <p>{data.price}원/명</p>
                                <select onChange={handleHeadCount}>
                                    {[...Array(10).keys()].map(n => <option key={`HeadCount-${n+1}`} value={n+1} >{n+1}</option>)} 
                                </select>
                                <select>
                                    <option defaultValue="선택하세요">선택하세요</option>
                                    {data.times.map((time,idx) => <option  key={`${idx}-${time}`} value={time}>{time}</option>)}
                                </select>
                                <button type="submit">예약하기</button>
                                <p>총 합게 : {data.price * headCount }</p> 
                                {/* totalPrice */}
                            </Form>
                        </Content>
                    </DetailContainer>
            }
        </div>
    );
};


const DetailContainer = styled.div`
    display:flex;
    flex-direction:column;
    text-align: left;
    .header .title{
        display:flex;
        width:100%;
    }
`;
const Content = styled.div`
    display:flex;
`;

const Period = styled(Content)`
    justify-content: flex-start;

    div:first-child{
        margin-right:3%;
    }
    .time{    
        flex-basis: 400px;
        height: 220px;
        border:1px solid black;
    }
`;
const Inform = styled.div`
    width: 100%;
    margin-right : 3%;
`;
const Form = styled.form`
    height: 200px;
    border : 1px solid black;
    position: sticky;
    top: 20%;
`;
const Company = styled.div`
    border : 1px solid black;
`;
const TimButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
`;
const TimeButton = styled.button`
    width : 300px;
    height : 90px;
    font-size : 1rem;
    background-color : white;
    border : 1px orange solid;
    &.active {
        background-color : orange;
        opacity: 0.5;
        color : white;
    }
`;

export default Detail;