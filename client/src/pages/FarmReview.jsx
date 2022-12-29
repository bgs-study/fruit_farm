import React from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import { useState, useEffect } from 'react';
import ModalContainer from './../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import Moment from 'moment';
import * as API from '../lib/userApi';
import { StatusSelect, ConfirmButton } from '../styles/Styled';

const Subject = styled.h2`
	text-align: center;
	margin-bottom: 2%;
`;

const DateSelect = styled(StatusSelect)`
	margin-bottom: 3%;
`;
const ReviewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ReviewBox = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	margin-bottom: 1%;
	border: solid 1px lightgray;
	border-radius: 10px;
	width: 60%;
	padding: 1rem;
`;

const InfoWrapper = styled.div``;

const Info = styled.p``;

const InfoText = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 15rem;
	height: 20px;
`;

const InfoTextInMadal = styled.div``;

const Button = styled(ConfirmButton)`
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const SelectWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 60%;
`;

const P = styled.p`
	margin-top: 3rem;
`;
const FarmReview = () => {
	const dispatch = useDispatch();
	const modalOpen = useSelector((state) => state.modal.modal);
	const [originalData, setOriginalData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [selectedDate, setSelectedDate] = useState('지난 3개월');
	const [modalData, setModalData] = useState(null);
	const [message, setMessage] = useState('');

	const fetchData = async () => {
		try {
			await API.get(`/api/review/farmer`).then((res) => {
				let fixedData = res.data.map(({ review, reserve }) => {
					return {
						id: review.id,
						date: `${reserve.date} ${reserve.start_time.slice(
							0,
							5,
						)}-${reserve.end_time.slice(0, 5)}`,
						people: reserve.personnel,
						createDate: `${review.createdAt.slice(0, 10)}`,
						content: review.content,
					};
				});
				setOriginalData(fixedData);
				// memo 지우: 최초 렌더링시 최근 3개월 안의 데이터만 보여주기 위함
				filterData(fixedData);
			});
		} catch (err) {
			console.error(err.response.data.message);
			setMessage(err.response.data.message);
		}
	};

	const filterData = (data) => {
		let filteredData = [...data];

		if (selectedDate === '지난 3개월') {
			filteredData = filteredData.filter(
				(obj) =>
					Moment().subtract(3, 'months').format('YYYY-MM-DD') < obj.createDate,
			);
		} else if (selectedDate === '지난 6개월') {
			filteredData = filteredData.filter(
				(obj) =>
					Moment().subtract(6, 'months').format('YYYY-MM-DD') < obj.createDate,
			);
		} else if (selectedDate === '지난 1년') {
			filteredData = filteredData.filter(
				(obj) =>
					Moment().subtract(1, 'years').format('YYYY-MM-DD') < obj.createDate,
			);
		}
		setFilteredData(filteredData);
	};

	const onClickBtn = (e) => {
		setModalData(
			filteredData.filter((obj) => obj.id === parseInt(e.target.name))[0],
		);
		dispatch(showModal());
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (originalData) filterData(originalData);
	}, [selectedDate]);

	return (
		<>
			<FarmFormat>
				<Subject>후기 관리</Subject>
				<ReviewWrapper>
					{filteredData && (
						<SelectWrapper>
							<DateSelect onChange={(e) => setSelectedDate(e.target.value)}>
								<option value="지난 3개월">지난 3개월</option>
								<option value="지난 6개월">지난 6개월</option>
								<option value="지난 1년">지난 1년</option>
							</DateSelect>
						</SelectWrapper>
					)}
					{filteredData &&
						filteredData.map((review) => {
							return (
								<ReviewBox key={review.id}>
									<InfoWrapper>
										<Info>
											<b>작성일:</b> {review.createDate}
										</Info>
										<Info>
											<b>예약일:</b> {review.date}
										</Info>
										<Info>
											<b>인원:</b> {review.people}
										</Info>
									</InfoWrapper>
									<InfoText>{review.content}</InfoText>
									<Button name={review.id} onClick={(e) => onClickBtn(e)}>
										더보기
									</Button>
								</ReviewBox>
							);
						})}
					<P>{message}</P>
				</ReviewWrapper>
				{modalOpen && (
					<ModalContainer w="30%" h="50%">
						<InfoWrapper>
							<Info>
								<b>작성일:</b> {modalData.createDate}
							</Info>
							<Info>
								<b>예약일:</b> {modalData.date}
							</Info>
							<Info>
								<b>인원:</b> {modalData.people}명
							</Info>
							<InfoText>{modalData.content}</InfoText>
						</InfoWrapper>
						<InfoTextInMadal></InfoTextInMadal>
					</ModalContainer>
				)}
			</FarmFormat>
		</>
	);
};

export default FarmReview;
