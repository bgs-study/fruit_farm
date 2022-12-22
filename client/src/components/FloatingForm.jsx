import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHeadCount, getTotalPrice } from '../store/FormSlice';
import { useNavigate } from 'react-router-dom';
import { DetailContext } from '../pages/DetailPage';
import styled from 'styled-components';

const Form = styled.form`
	width: 50%;
	height: 200px;
	border: 1px solid black;
	padding: 5%;
	position: sticky;
	top: 20%;
`;
const SelectBox = styled.select``;

const FloatingForm = () => {
	const { detailData: data } = useContext(DetailContext);
	const { price, title, company, period, times } = data;

	const [headCount, setHeadCount] = useState(1);
	const [totalPrice, setTotalPrice] = useState(undefined);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formData = useSelector((state) => state.form);

	const handleHeadCount = (e) => {
		setHeadCount(e.target.value);
	};

	const handleSubmit = (e) => {
		// 페이지 이동전, 인원이 초과 되는 지 확인을 위한 get 요청
		// 인원초과 되면 alert창 + return
		// + 동시접속에 대한 확인요청

		navigate('/pay', {
			state: {
				...formData,
				price: price,
				farm: company.name,
				programName: title,
				period: { start: period[0], end: period[1] },
				times: times,
			},
		});
	};

	useEffect(() => {
		setTotalPrice(headCount * price);
		dispatch(getHeadCount(headCount));
	}, [headCount, setTotalPrice]);

	useEffect(() => {
		dispatch(getTotalPrice(totalPrice));
	}, [totalPrice]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<p>{formData.date}</p>
				<p>{formData.time}</p>
				<p>{price}원/명</p>
				<SelectBox onChange={handleHeadCount} value={headCount}>
					{[...Array(10).keys()].map((n) => (
						<option key={`HeadCount-${n + 1}`} value={n + 1}>
							{n + 1}
						</option>
					))}
				</SelectBox>
				<span>명</span>
				<button type="submit">예약하기</button>
				<p>총 합게 : {totalPrice || price}</p>
			</Form>
		</>
	);
};

export default FloatingForm;
