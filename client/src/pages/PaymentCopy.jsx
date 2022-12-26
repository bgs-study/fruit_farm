import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalContainer from './../components/Modal';
import { showModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Calender from '../components/ReactCalender';
import * as userApi from '../lib/userApi';

// Memo 혜실: 상세페이지를 수정 중이라 데이터가 안넘어와서 결제창을 수정할 수 없음, 그래서 카피본을 만들어서 목데이터로 일단 수정중

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
const ReservationInfo = ({ data }) => {
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(data.period);
	}, [data]);

	const { times } = data;

	return (
		<>
			{data && (
				<>
					<H1>예약 및 결제</H1>
					<H2>예약 정보</H2>
					<H3>날짜</H3>
					<Info>{data.date}</Info>
					<H3>시간</H3>
					<Info>{data.time}</Info>
					<H3>인원</H3>
					<Info>{data.headCount}</Info>
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
											start: data.period.start,
											end: data.period.end,
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
									<Select>
										{[...Array(10).keys()].map((n) => (
											<option key={`HeadCount-${n + 1}`} value={n + 1}>
												{n + 1}
											</option>
										))}
									</Select>
								</ModalContent>
							</ModalLayout>
						</ModalContainer>
					)}
					<Line />
				</>
			)}
		</>
	);
};

//SideBar
const SideBar = ({ data }) => {
	const { farm, price, headCount, totalPrice } = data;

	return (
		<>
			{data && (
				<div>
					<PayboxTop>
						{/* memo 혜실 : img 데이터 받기 구현 예정 */}
						<Image></Image>
						<PayboxName>
							<NameInfo>{farm}</NameInfo>
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
// Memo 혜실 : 받은 유저 정보 렌더링
// 예약자 정보
const SubscriberInfo = ({ userData }) => {
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState('');
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState('');

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

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
		</>
	);
};

function Payment() {
	const [data, setData] = useState({});
	const [userData, setUserData] = useState({});
	const [Selected, setSelected] = useState('card');

	const optionHandle = (e) => {
		setSelected(e.target.value);
	};
	useEffect(() => {
		getData();
		getUserData();
	}, []);

	const getData = async () => {
		try {
			const res = await axios.get('/pay.json');
			const data = await res.data;
			// console.log(data);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	};
	// Memo 혜실: user정보 받아오기
	const getUserData = async () => {
		try {
			const res = await userApi.get('//localhost:3500/api/myInfo');
			const userData = await res.data;
			console.log(userData);
			setUserData({
				name: userData.name,
				phoneNum: userData.phoneNum,
				email: userData.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(
				'http://localhost:3500/api/reserve',
				{
					total_price: data.totalPrice,
					payment: Selected,
					name: userData.name,
					phoneNum: userData.phoneNum,
					email: userData.email,
					personnel: data.headCount,
					time_id: '4',
				},
			);
			console.log(reserData);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<Context>
					<ReservationInfo data={data}></ReservationInfo>
					<SubscriberInfo userData={userData}></SubscriberInfo>
					<Select>
						<option value="card" key={1}>
							카드결제
						</option>
						<option value="transfer" key={2}>
							계좌이체
						</option>
					</Select>
					<PaymentInfo option={optionHandle}></PaymentInfo>
					<Button onClick={postData}>확인 및 결제</Button>
				</Context>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar data={data}></SideBar>
					</SideBarDiv>
				</StickyBox>
			</div>
		</>
	);
}

export default Payment;
