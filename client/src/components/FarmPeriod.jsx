import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initDate } from '../store/FormSlice';
import Calender from '../components/ReactCalender';
import styled from 'styled-components';
import { WhiteGreenBtn} from '../styles/Styled';


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
const SelectedDate = styled.p`
    margin : 2% 0;
`
const CalendarBtn = styled(WhiteGreenBtn)``

//memo 지혜 : period (체험운영기간)
const FarmPeriod = (props) =>{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startCalenderOpen, setStartCalenderOpen] = useState(false);
    const [endCalenderOpen, setEndCalenderOpen] = useState(false);

    const dispatch = useDispatch();
    const date = useSelector(({form}) => form.date);
    
    useEffect (() => {
        setStartDate(date);
    },[startCalenderOpen]);

    useEffect (() => {
        setEndDate(date);
    },[endCalenderOpen]);

    useEffect (() => {
        //memo 지혜 : 상위 컴포넌트로 startDate전달
        props.onStateLifting({startDate:startDate});
        dispatch(initDate());
    },[startDate]);

    useEffect (() => {
        //memo 지혜 : 상위 컴포넌트로 endDate전달
        props.onStateLifting({endDate:endDate});
        dispatch(initDate());
    },[endDate]);

    const handleEndCalenderOpen =()=>{
        // memo 지혜 : 시작날 선택전 마지막날 선택하는 것을 막음
        if(startDate===''){alert('시작날짜를 먼저 정해주세요.');return;}
        setEndCalenderOpen(!endCalenderOpen)
    }

    return (        
        <CalenderContainer>
            <CalenderContent>
                <StartCalenderContent>
                    <CalendarBtn type='button' onClick={()=>setStartCalenderOpen(!startCalenderOpen)}>시작날짜</CalendarBtn>
                    {
                        startCalenderOpen ? <Calender period={{start : new Date()}} create/> : null
                    }
                    <SelectedDate>{!startCalenderOpen && startDate}</SelectedDate>
                </StartCalenderContent>
            </CalenderContent>
            <CalenderContent>
                <EndCalenderContent>
                    <CalendarBtn type='button' onClick={()=>handleEndCalenderOpen()}>마감날짜</CalendarBtn>
                    {
                        endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                    }
                    <SelectedDate>{!endCalenderOpen && endDate}</SelectedDate>
                </EndCalenderContent>
            </CalenderContent>
        </CalenderContainer>
    )
};

export default FarmPeriod;