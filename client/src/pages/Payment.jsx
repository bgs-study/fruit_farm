import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';

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

// 예약정보
const ReservationInfo = ({ payData }) => {
	const navigate = useNavigate();
	const goDetail = () => {
		navigate(-1);
	};

	return (
		<>
			{payData && (
				<>
					<H1>예약 및 결제</H1>
					<H2>예약 정보</H2>
					<H3>날짜</H3>
					<Info>{payData.date}</Info>
					<H3>시간</H3>
					<Info>
						{payData.startTime} ~ {payData.endTime}
					</Info>
					<H3>인원</H3>
					<Info>{payData.headCount}</Info>
					<Button onClick={goDetail}>예약정보수정</Button>
					<Line />
				</>
			)}
		</>
	);
};

//SideBar
const SideBar = ({ payData }) => {
	const { farm, price, headCount, totalPrice } = payData;

	return (
		<>
			{payData && (
				<div>
					<PayboxTop>
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

const Payment = () => {
	const location = useLocation();
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [payData, setPayData] = useState({});
	const [userData, setUserData] = useState({});
	const [selected, setSelected] = useState('card');
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(userData.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNum);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(userData.email);
	const [resData, setResData] = useState([]);
	const [personnel, setPersonnel] = useState(0);
	const [pay, setPay] = useState(false);

	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [payData]);

	const getUserData = async () => {
		try {
			const res = await userApi.get('//localhost:3500/api/myInfo');
			const userData = await res.data;
			setUserData({
				name: userData.name,
				phoneNum: userData.phoneNum,
				email: userData.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const submitHandler = async () => {
		getReserveData();
	};

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(
				'http://localhost:3500/api/reserve',
				{
					total_price: payData.totalPrice,
					payment: selected,
					name: name,
					phoneNum: phoneNumber,
					email: email,
					personnel: payData.headCount,
					time_id: payData.timeId,
				},
			);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPay(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			dispatch(showModal());
		}
	}, [resData]);

	const getReserveData = async () => {
		try {
			const res = await userApi.get(
				`http://localhost:3500/api/timetables/${payData.farmId}`,
			);
			const resData = await res.data;
			setResData(resData);
			for (let i = 0; i < resData.length; i++) {
				if (resData[i].id === payData.timeId) {
					setPersonnel(resData[i].personnel);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<Context>
					<ReservationInfo payData={payData}></ReservationInfo>
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
					<Select onChange={handleSelect} value={selected}>
						<Option value="card" key="card">
							카드결제
						</Option>
						<Option value="transfer" key="transfer">
							계좌이체
						</Option>
					</Select>
					<PaymentInfo></PaymentInfo>
					<Button onClick={submitHandler}>확인 및 결제</Button>
				</Context>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
				{modalOpen && (
					<ModalContainer>
						{pay ? (
							<div>
								<H1>결제완료</H1>
								<Button
									onClick={() => {
										dispatch(closeModal());
										navigate(`/`);
									}}
								>
									확인
								</Button>
								<Button
									onClick={() => {
										dispatch(closeModal());
										navigate(`/myreservation`);
									}}
								>
									구매내역보기
								</Button>
							</div>
						) : (
							<div>
								<H1>결제실패</H1>
								<P>체험 인원 초과로 예약이 실패되었습니다</P>
								<P>다른 시간대로 예약해주세요</P>
								<Button
									onClick={() => {
										dispatch(closeModal());
										navigate(-1);
									}}
								>
									확인
								</Button>
							</div>
						)}
					</ModalContainer>
				)}
			</div>
		</>
	);
};

export default Payment;
