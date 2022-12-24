import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalContainer from './../components/Modal';
import { showModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Calender from '../components/ReactCalender';
// import TimeBtns from '../components/TimeBtns';

const Context = styled.div``;

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const Info = styled.p``;

const NameInfo = styled.p``;

const Button = styled.button``;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: blue;
	margin: 5% 0;
`;

const Image = styled.img`
	width: 100px;
	height: 100px;
`;

const Select = styled.select``;

const Option = styled.option``;

const P = styled.p``;

const SideBarDiv = styled.div`
	background: grey;
	width: 300px;
`;

const PayboxTop = styled.div`
	display: flex;
	flex-direction: row;
`;

const PayboxName = styled.div`
	display: flex;
	flex-direction: column;
`;
const ModalLayout = styled.div`
	display: felx;
`;
const ModalTitle = styled.div`
	width: 30%;
	margin-right: 5%;
`;
const ModalContent = styled.div`
	width: 60%;
	height: 450px;
	margin-top: 5%;
	overflow-y: auto;
	overflow-x: hidden;
`;
// 예약정보
const ReservationInfo = ({ payData }) => {
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(payData.period);
	}, [payData]);

	const { times } = payData;

	return (
		<>
			{payData && (
				<>
					<H1>예약 및 결제</H1>
					<H2>예약 정보</H2>
					<H3>날짜</H3>
					<Info>{payData.date}</Info>
					<H3>시간</H3>
					<Info>{payData.time}</Info>
					<H3>인원</H3>
					<Info>{payData.headCount}</Info>
					<Button onClick={() => dispatch(showModal())}>예약정보수정</Button>

					{modalOpen && (
						<ModalContainer>
							<ModalLayout>
								<ModalTitle>
									<H3>예약 수정</H3>
								</ModalTitle>
								<ModalContent>
									<Calender
										period={{
											start: payData.period.start,
											end: payData.period.end,
										}}
										update
									/>
									<Select>
										{[...times].map((n) => (
											<option key={n} value={n}>
												{n}
											</option>
										))}
									</Select>
									<select>
										{[...Array(10).keys()].map((n) => (
											<option key={`HeadCount-${n + 1}`} value={n + 1}>
												{n + 1}
											</option>
										))}
									</select>
								</ModalContent>
							</ModalLayout>
						</ModalContainer>
					)}
					{/* <TimeBtns></TimeBtns> */}
					{/* {isEdit ? <ReactCalender></ReactCalender> : null} */}
					<Line />
				</>
			)}
		</>
	);
};

//SideBar
const SideBar = ({ payData }) => {
	const { farm, programName, price, headCount, totalPrice } = payData;

	return (
		<>
			{payData && (
				<div>
					<PayboxTop>
						{/* img 데이터 받기 */}
						<Image></Image>
						<PayboxName>
							<NameInfo>{farm}</NameInfo>
							<NameInfo>{programName}</NameInfo>
						</PayboxName>
					</PayboxTop>
					<H3>요금 세부정보</H3>
					<NameInfo>1인 체험권</NameInfo>
					<Info>
						{price}원 X{headCount}
					</Info>
					<Info>{totalPrice || null}</Info>
					<Line />
					<Info>결제 예정 금액</Info>
					<Info>{totalPrice || null}</Info>
				</div>
			)}
		</>
	);
};

// 예약자 정보
const SubscriberInfo = ({ data }) => {
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(data.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(data.email);

	useEffect(() => {
		setName(data.name);
		setPhoneNumber(data.phoneNumber);
		setEmail(data.email);
	}, [data]);

	return (
		<>
			<H2>예약자 정보</H2>
			<H3>예약자</H3>
			{nameOpen ? (
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			) : (
				<Info>{name}</Info>
			)}
			{nameOpen ? (
				<Button onClick={() => setNameOpen(!nameOpen)}>완료</Button>
			) : (
				<Button onClick={() => setNameOpen(!nameOpen)}>수정</Button>
			)}
			<H3>연락처</H3>
			{phoneNumberOpen ? (
				<input
					type="text"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			) : (
				<Info>{phoneNumber}</Info>
			)}
			{phoneNumberOpen ? (
				<Button onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
					완료
				</Button>
			) : (
				<Button onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
					수정
				</Button>
			)}
			<H3>이메일</H3>
			{emailOpen ? (
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			) : (
				<Info>{email}</Info>
			)}
			{emailOpen ? (
				<Button onClick={() => setEmailOpen(!emailOpen)}>완료</Button>
			) : (
				<Button onClick={() => setEmailOpen(!emailOpen)}>수정</Button>
			)}

			<RiErrorWarningLine />
			<P>입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.</P>
			<Line />
		</>
	);
};

//결제 수단
const PaymentInfo = () => {
	return (
		<>
			<H3>결제 수단</H3>
			<Select name="cardOption">
				<Option value="card">카드결제</Option>
				<Option value="transfer">계좌이체</Option>
			</Select>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<p>정보제공 수집 및 제공 동의</p>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불
							규정에 동의합니다.
						</P>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<p>환불 정책 동의</p>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에
							따라 환불액이 결정됩니다.
							<br />
							<br /> *취소 및 환불 규정*
							<br />
							예약일로부터 7일 전 : 100% 환불
							<br />
							예약일로부터 3일 전 : 50% 환불
							<br />
							예약일로부터 1일 전 : 환불 불가
						</P>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Line />
			<P>주문 내용을 확인하였으며, 위 내용에 동의합니다.</P>
			<Button>확인 및 결제</Button>
		</>
	);
};

const Payment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [payData, setPayData] = useState({});
	const [data, setData] = useState({});

	useEffect(() => {
		console.log(location.state);
		setPayData(location.state);
	}, []);

	useEffect(() => {
		GetData();
	}, []);

	const GetData = async () => {
		try {
			const res = await axios.get('/pay.json');
			const data = await res.data;
			// console.log(data);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	};

	// const goDetail = () => {
	// 	navigate('/detail');
	// };

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<Context>
					<ReservationInfo payData={payData}></ReservationInfo>
					<SubscriberInfo data={data}></SubscriberInfo>
					<PaymentInfo></PaymentInfo>
				</Context>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
			</div>
		</>
	);
};

export default Payment;
