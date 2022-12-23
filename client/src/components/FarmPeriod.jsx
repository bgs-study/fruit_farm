import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calender from '../components/ReactCalender';
import styled from 'styled-components';


const CalenderContainer = styled.div`
    display : flex;
    justify-content : center;
`;
const CalenderContent = styled.div`
    display : block;
    width: 100%;
    text-align : center;
`;
const StartCalenderContent = styled.div``;
const EndCalenderContent = styled.div``;

//period (체험운영기간)
const FarmPeriod = (props) =>{
    //시작날
    const [startDate, setStartDate] = useState('');
    //마지막날
    const [endDate, setEndDate] = useState('');
    //시작날을 정하는 캘린더 open
    const [startCalenderOpen, setStartCalenderOpen] = useState(false);
    //마지막날을 정하는 캘린더 open
    const [endCalenderOpen, setEndCalenderOpen] = useState(false);
    //캘린더 날짜 선택시 그 값을 store에 저장해둠. 그것을 꺼내는 코드임
    const date = useSelector((state) => state.form.date);
    
    useEffect (() => {
        setStartDate(date);
    },[startCalenderOpen]);

    useEffect (() => {
        setEndDate(date);
    },[endCalenderOpen]);

    useEffect (() => {
        //상위 컴포넌트로 startDate전달
        props.onStateLiftining({startDate:startDate});
    },[startDate]);

    useEffect (() => {
        //상위 컴포넌트로 endDate전달
        props.onStateLiftining({endDate:endDate});
    },[endDate]);

    // 시작날 선택전 마지막날 선택하는 것을 막음
    const onHandleEndCalenderOpen =()=>{
        if(startDate===''){alert('시작날짜를 먼저 정해주세요.');return;}
        setEndCalenderOpen(!endCalenderOpen)
    }
    return (        
        <CalenderContainer>
            <CalenderContent>
            <StartCalenderContent>
                <button type='button' onClick={()=>setStartCalenderOpen(!startCalenderOpen)}>시작날짜</button>
                {
                    startCalenderOpen ? <Calender period={{start : new Date()}} create/> : null
                }
                <p>{!startCalenderOpen && startDate}</p>
            </StartCalenderContent>
        </CalenderContent>
        <CalenderContent>
            <EndCalenderContent>
                <button  type='button' onClick={()=>onHandleEndCalenderOpen()}>마감날짜</button>
                {
                    endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                }
                <p>{!endCalenderOpen && endDate}</p>
            </EndCalenderContent>
        </CalenderContent>
    </CalenderContainer>
    )
};

export default FarmPeriod;