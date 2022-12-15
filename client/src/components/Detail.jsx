import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Calender from "./Calender";
import Location from "./Location";
import Review from "./Review";

const Detail = ({ data }) => {
    const [Selected, setSelected] = useState(1);
 
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

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
                                    <Calender>캘린더</Calender>
                                    <div className="time">
                                        { 
                                            data.times.map( (time,idx)=>{
                                                return <TimeButton key={`${idx}-${time}`}>{idx+1}타임  {time}</TimeButton>
                                            })
                                        }                                        
                                    </div>
                                </Period>
                                <Review review={data.review}>후기</Review>
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
                                <select onChange={handleSelect}>
                                    {[...Array(10).keys()].map(n => <option key={`HeadCount-${n+1}`} value={n+1}>{n+1}</option>)} 
                                </select>
                                <select>
                                    <option defaultValue="선택하세요">선택하세요</option>
                                    {data.times.map((time,idx) => <option  key={`${idx}-${time}`} value={time}>{time}</option>)}
                                </select>
                                <button type="submit">예약하기</button>
                                <p>총 합게 : { Selected * data.price }</p>
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
    & div{    
        flex-basis: 200px;
        height: 200px;
        border:1px solid black;
    }
    & :not(:last-child) {
        margin-right:3%;
    }
`;
const Inform = styled.div`
    width: 100%;
    margin-right : 3%;
`;
const Form = styled.form`
    width: 25%;
    height: 200px;
    border : 1px solid black;
    position: sticky;
    margin: 0 3%;
    top: 20%;
`;
const Company = styled.div`
    border : 1px solid black;
`;

const TimeButton = styled.button`
    width : 100%;
    height: 20%;
    background-color : white;
`;

export default Detail;