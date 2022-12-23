import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import ModalContainer from '../components/Modal'
import FarmPeriod from "../components/FarmPeriod";
import FarmFormat from '../components/FarmFormat';
import styled from 'styled-components';
import axios from 'axios';
import FarmTime from "../components/FarmTime";

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
	margin-bottom: 3%;
`;
const TimeTableList = styled.div`
    border:1px black solid;
    padding 15px;
    margin-bottom: 20px;
    margin-left: 3%;
`;
const Img = styled.img`
    margin-right: 20px;
`;
const TimTableContent = styled.div`
    display:block
    width: 100%;
`; 
const TimTableItem = styled.div`
    display:flex;
`;
const AddTimTable = styled.button`
    display:block;
    margin-left:auto;
    margin-bottom:10px;
`;
const TimeTableButtons = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:auto;
`;
const TimeTableButton =styled.button`
    :not(:last-child) {
        margin-bottom:10px;
    }
`;


//TimeTable
const TimeTable = ()=>{
    const [timeTable, setTimeTable] = useState([]);
    const [postData, setPostData] = useState({});
    const [cost, setCost] = useState(0);
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);

    const fetchData = async () => {
        try {
            await axios.get('/timetable.json').then((res) => {
                // console.log(res.data);
                setTimeTable(res.data);
            });
        }
        catch(e){
            console.log(e);
        }
    };

    const stateLiftining = state => {
        console.log("state",state);
        console.log("before",postData);
        console.log("set",{...postData,...state});
        setPostData({...postData,...state});
    }
    
    useEffect(()=>{
        console.log("after",postData);
    },[postData])

    const handleSubmit = (e) =>{   
        e.preventDefault();
        console.log({...postData,cost});
    };

    const onTimeTableDelete = (idx) => {
        timeTable.splice(idx,1);
        setTimeTable([...timeTable]);
        // 삭제 요청api
    };

    const onTimeTableUpdate = (e)=>{
        dispatch(showModal())
    };

    useEffect (() => {
        fetchData();
    }, []);

    
    return (
        <>
        <FarmFormat>
            
            <Subject>체험시간표</Subject>
            <AddTimTable onClick = {() => dispatch(showModal())}>추가하기</AddTimTable>
            { timeTable && 
                    timeTable.map((table,idx) =>{

                        return(
                            <TimeTableList>
                                <h4>체험테이블{idx+1}</h4>
                                <TimTableItem>
                                    <Img alt='농장이미지'></Img>
                                    <TimTableContent>
                                        <div>
                                            <span>날짜 : </span>
                                            <span>{table.date}</span>
                                        </div>
                                        <div>
                                            <span>시작시간 : </span>
                                            <span>{table.start_time}</span>
                                        </div>

                                        <div>
                                            <span>끝나는시간 : </span>
                                            <span>{table.end_time}</span>
                                        </div>
                                        
                                        <div>
                                            <span>가격 : </span>
                                            <span>{table.price}</span>  
                                        </div>
                                            
                                        <div>
                                            <span>인원수 : </span>
                                            <span>{table.personnel}</span>
                                        </div>
                                </TimTableContent>
                                <TimeTableButtons>
                                    <TimeTableButton type='button' onClick={()=>onTimeTableUpdate(idx)}>수정</TimeTableButton>
                                    <TimeTableButton type='button' onClick={()=>onTimeTableDelete(idx)}>삭제</TimeTableButton>
                                </TimeTableButtons>
                                </TimTableItem>
                            </TimeTableList>
                        )
                    })
            }
        </FarmFormat>

        { modalOpen && <ModalContainer>
                <form onSubmit={handleSubmit}>
                    <h1>체험시간표</h1>
                    <div>
                        <h3>체험 날짜</h3>
                        <FarmPeriod onStateLiftining ={stateLiftining}/>  
                    </div>

                    <div>
                        <h3>체험 시간</h3>
                        <FarmTime onStateLiftining={stateLiftining}></FarmTime>
                        
                    </div>
                    <div>
                        <h3>체험 비용</h3>
                        <input type='text' placeholder='입력하세요' value={cost} onChange={(e)=>setCost(e.target.value)}></input>
                    </div>
                    <button type='submit'>추가하기</button>
                </form>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;