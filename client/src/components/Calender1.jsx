import styled from 'styled-components';
import {useState,useEffect} from "react";

const calenderData = (startDate) =>{

    const viewYear = startDate.getFullYear();
    const viewMonth = startDate.getMonth();

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    
    const  thisDates = [...Array(TLDate + 1).keys()].slice(1); // 1 ~ n 까지
    const prevDates = preBuildDate (PLDate,PLDay)
    const nextDates = nextBuildDate (TLDay);

    const [preDatesButton,thisDatesButton,nextDatesButton] = buildCalendar(prevDates,thisDates,nextDates);
    const thisCalender = [...preDatesButton,...thisDatesButton,...nextDatesButton]
    return thisCalender;
}

const buildCalendar = (prevDates,thisDates,nextDates)=>{

    prevDates.forEach((date, i) => {
        prevDates[i] = <td key={`preDate-td-${i}`} ><button className="date disabled" key={`preDate-${date}-button`} disabled>{date}</button></td>;
    });
    nextDates.forEach((date, i) => {
        nextDates[i] = <td key={`nextDate-td-${i}`} ><button className="date disabled" key={`nextDate-${date}`} disabled>{date}</button></td>;
    });
    thisDates.forEach((date, i) => {
        thisDates[i] = <td key={`thisDate-td-${i}`} ><button className="date abled" key={`thisDate-${date}`}>{date}</button></td>;
    });
    return [prevDates,thisDates,nextDates];
}

const preBuildDate = (PLDate,PLDay)=>{
    const prevDates = [];
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }
    return prevDates;
}
const nextBuildDate = (TLDay)=>{
    const nextDates =[];
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }
    return nextDates;
}

// const prevMonth = (startDate) => {

//     calenderData();
// }


    
// const goToday = () => {
//     date = new Date();
//     renderCalendar();
// }
const day = () =>{
    const days = ["일","월","화","수","목","금","토"];
    return days.map( d => <td key={`${d}`}>{d}</td>)
}

const calenderBody = (thisCalender)=>{
    let week = [];
    const size = 7;
    for (let i = 0; i < thisCalender.length; i += size) { 
        week.push(thisCalender.slice(i, i + size));
    }
    return week;
};

const Calender = ({period})=>{
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [start, end] = period.map( p => p.split("/"));

    const startDate = new Date(...start); //월은 0부터 시작
    const endDate = new Date(...end);

    const thisCalender = calenderData(startDate);
    // ["2022/12/15","2023/2/28"]
    // startDage.getMonth() ===  0
    // startDage.getMonth() -1 === -1
    const week = calenderBody(thisCalender);


    useEffect (() => {
        setMonth(startDate.getMonth() + 1);
        setYear(startDate.getFullYear());
    },[]);

    useEffect (() => {
        calenderData(month);
    },[month]);





    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <td><label>{'<'}</label></td>
                        <td align="center" id="tbCalendarYM" colSpan="5">{year}년 {month}월</td>
                        <td><label onClick={()=>setMonth(month+1)}>{'>'}</label></td>
                    </tr>
                    <tr>{day()}</tr>
                    {
                        week.map((w,idx)=><tr className="week" key={`week${idx}`}>{w}</tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

const Table = styled.table`
    text-align:center;
    margin:auto;
    
    .date {  
        text-align: center;
        padding:0px;
        width:25px;
        height:25px;
        background:none;
        border:none;
        color:black;
    }
    .date:hover{
        background:lightgray;
    }
    .disabled{
        color:lightgray;
    }
`;

export default Calender;