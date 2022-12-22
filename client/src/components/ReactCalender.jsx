import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../store/FormSlice';
import { DetailContext } from '../pages/DetailPage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const IsNotPay = () => {
	const { detailData: data } = useContext(DetailContext);
	const [start, end] = data.period;
	return [new Date(start), new Date(end)];
};

const ReactCalender = (props) => {
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	let [start, end] = ['', ''];

	if (props.create) {
		start = props.period.start;
		end = null;
		setDate();
	} else if (props.update) {
		start = new Date(props.period.start);
		end = new Date(props.period.end);
	} else {
		[start, end] = IsNotPay();
	}

	useEffect(() => {
		const dateForm = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;
		dispatch(getDate(dateForm));
	}, [date]);

	return (
		<Calendar
			calendarType="US"
			onChange={setDate}
			value={date}
			minDate={start}
			maxDate={end}
		/>
	);
};

export default ReactCalender;
