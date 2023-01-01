import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { getDate } from '../store/FormSlice';
import { DetailContext } from '../pages/DetailPage';
import Moment from 'moment';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = styled.div`
	.react-calendar__tile:disabled {
		background-color: rgb(191,206,191,0.3);
	}
	.react-calendar__tile--now {
		background: lightyellow;
	}
	.react-calendar__navigation__label > span {
		font-size: 1rem;
		font-weight: 500;
	}
	.react-calendar__navigation button:disabled {
		background-color:  rgb(191,206,191,0.3);
	}
	.react-calendar__navigation button:enabled:hover,
	.react-calendar__navigation button:enabled:focus {
		background-color: yellowgreen;
		opacity: 0.5;
	}
	.react-calendar__tile--now:enabled:hover,
	.react-calendar__tile--now:enabled:focus {
		background: lightyellow;
		border-radius: 8px;
	}
	.react-calendar__tile:enabled:hover{
		color: white;
		background-color: yellowgreen;
		border-radius: 8px;
		opacity: 0.5;
	}
	.react-calendar__tile:enabled:focus,
	.react-calendar__tile--active {
		color: white;
		background-color: yellowgreen;
		border-radius: 8px;
	};
`;


const IsNotPay = () => {
	const { timeTable } = useContext(DetailContext);
	if (timeTable){
		//memo 지혜 : 타임테이블 하나도 없는 경우
		if (!timeTable.length){
			return [new Date(), new Date()]
		}
		const orderedDate = timeTable.sort((a, b) => new Date(a.date) - new Date(b.date));
		const diff = Moment(orderedDate[orderedDate.length - 1].date).diff(Moment(),'days');

		// memo 지혜 : 오늘날짜보다 체험시간표의 끝 날짜가 더 이르다면 (전부 끝난 체험)
		// memo 지혜 : 오늘날짜보다 체험시간표의 끝 날짜가 같다면 (오늘까지 있는체험)
		if(diff <= 0){ 
			return [new Date(),new Date()];
		}
		// 오늘날짜보다 체험시간표의 끝 날짜가 멀다면 (아직 체험이 남아있음)
		// 시작날짜가 오늘이전 , 오늘 이후 
		else {
			const today = Moment();
			const start = Moment(orderedDate[0].date);
			const end =  orderedDate[orderedDate.length - 1].date;

			if(start.diff(today, 'days') < 0) {
				// todo 지혜 : 시작날짜가 오늘 이후 인 경우 첫날짜로 설정하고 싶음
				return [new Date(today), new Date(end)];
			}
			return [new Date(start) , new Date(end)];
		}	
	}
};

const ReactCalender = (props) => {
	const [date, setDate] = useState(null);
	const dispatch = useDispatch();
	let [min,max] = [new Date(), new Date()]

	if (props.create) {
		min = props.period.start;
		max = null;
	} 
	else {
		const range = IsNotPay();
		if(range){
			min = range[0];
			max = range[1];
		}
	}

	useEffect(() => {
		if (date){
			const dateForm = Moment(date).format('YYYY-MM-DD');
			dispatch(getDate(dateForm));
		}
	}, [date]);

	return (
		<CalendarContainer>
			<Calendar
				calendarType='US'
				onChange={setDate}
				value={date}
				minDate={min}
				maxDate={max}
			/>
		</CalendarContainer>
	);
};

export default ReactCalender;
