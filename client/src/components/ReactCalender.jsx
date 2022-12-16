import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


const ReactCalender = ({period}) => {
    const [start,end] = period;
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
export default ReactCalender;