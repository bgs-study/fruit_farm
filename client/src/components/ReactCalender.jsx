import React, { useState,useEffect,useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../store/FormSlice';
import { DetailContext } from '../pages/DetailPage'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


const IsNotPay = ()=>{
    const {detailData:data} = useContext(DetailContext);
    const [start,end] = data.period;
    return [start,end];
}

const ReactCalender = (props) => {
    const formData = useSelector(state => state.form);
    const [date, setDate] = useState(formData.date);
    const dispatch = useDispatch();
    let [start,end] =['',''];

    // 캘린더 사용법! 사용하신 후 지워주세요~
    // {date: , totalPrice: .. ,period =[startDate,endDate]}
    // <Calendar period = {start:period[0] , end: period[1] }>
    if (props.period) { 
        start = props.period.start;
        end = props.period.end;
    }else{
        [start,end] = IsNotPay();
    }

    const handleSetDate = (e) =>{
        const dateForm = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`;
        setDate(dateForm);
    }
    

    useEffect(() => {
        dispatch(getDate(date));
    },[date]);

    return (
        <Calendar calendarType='US' onChange={(e)=>handleSetDate(e)} value={new Date(date)} minDate={new Date(start)} maxDate={new Date(end)}/>
    );
};

export default ReactCalender;