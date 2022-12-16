import React, { useState,useEffect,useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { DetailContext } from "../pages/DetailPage"

const ReactCalender = () => {
    const {detailData : data} = useContext(DetailContext);
    const [start,end] = data.period;
    const [value, onChange] = useState(new Date(start));
    
    useEffect(() => {
        console.log(value)
    },[value]);

    return (
        <div>
            <Calendar calendarType="US" onChange={onChange} value={value} minDate={new Date(start)} maxDate = {new Date(end)}/>
        </div>
    );
};
export default React.memo(ReactCalender);