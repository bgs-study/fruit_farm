import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { yellow } from '../global-variables';
import {
	SubmitButton,
	ConfirmButton,
	DeleteButton,
	Input,
	StyledSubTitle,
} from '../styles/Styled';

const MomDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	min-width: 800px;
	width: 100%;
`;

const ContextDiv = styled.div`
	flex-direction: column;
	justify-content: center;
	width: 40%;
`;

const Box = styled.div`
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	justify-content: center;
	padding: 10px;
	transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		transform: translateY(-10px);
	}
`;

const FlexStartDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const SideBarDiv = styled.div`
	background: ${yellow};
	width: 250px;
	border-radius: 10%;
	padding: 20px;
	margin-left: 0.5rem;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const ModalDiv = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`;

const ModalBtnDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const ModalTittle = styled(StyledSubTitle)`
	margin-bottom: 30px;
`;

const Bold = styled.p`
	font-weight: 700;
	margin-right: 1rem;
`;

const P = styled.p``;

const Inp = styled(Input)`
	margin-bottom: 5px;
`;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #808080;
	margin: 2% 0;
`;

const GreenBtn = styled(SubmitButton)`
	margin-top: 0;
	padding: 1rem;
`;

const YellowBtn = styled(ConfirmButton)`
	margin-top: 0;
	padding: 0.8rem;
`;

const ConfirmBtn = styled(DeleteButton)`
	margin-top: 0;
	padding: 10px;
`;

const ModalBtn = styled.button`
	border: 1px black solid;
	border-radius: 10px;
	color: black;
	font-weight: 500;
	background-color: white;
	width: 120px;
	height: 40px;
	margin: 10px 0;
`;

// Memo 혜실 : 예약정보
const ReservationInfo = ({ payData }) => {
	const navigate = useNavigate();

	return (
		<>
			{payData && (
				<>
					<StyledSubTitle>예약 정보</StyledSubTitle>
					<FlexStartDiv>
						<Bold>날짜</Bold>
						<P>{payData.date}</P>
					</FlexStartDiv>
					<FlexStartDiv>
						<Bold>시간</Bold>
						<P>
							{payData.startTime} ~ {payData.endTime}
						</P>
					</FlexStartDiv>
					<FlexStartDiv>
						<Bold>인원</Bold>
						<P>{payData.headCount}명</P>
					</FlexStartDiv>
					<ButtonDiv>
						<GreenBtn onClick={() => navigate(-1)}>예약정보수정</GreenBtn>
					</ButtonDiv>
				</>
			)}
		</>
	);
};

// Memo 혜실 : SideBar
const SideBar = ({ payData }) => {
	const { farm, price, headCount, totalPrice } = payData;
	return (
		<>
			{payData && (
				<div>
					<StyledSubTitle>{farm}</StyledSubTitle>
					<Bold>요금 세부정보</Bold>
					<P>1인 체험권</P>
					<TextDiv>
						<P>
							{price ? price.toLocaleString('ko-KR') : 0}원 X{headCount}
						</P>
						<P>{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원</P>
					</TextDiv>
					<Line />
					<TextDiv>
						<StyledSubTitle>결제 예정 금액</StyledSubTitle>
						<StyledSubTitle>
							{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원
						</StyledSubTitle>
					</TextDiv>
				</div>
			)}
		</>
	);
};

// Memo 혜실 : 결제 수단
const PaymentInfo = () => {
	return (
		<>
			<Accordion
				style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
			>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<Bold>정보제공 수집 및 제공 동의</Bold>
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
						<Bold>환불 정책 동의</Bold>
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
			<RowDiv>
				<div>
					<RiErrorWarningLine size="20" />
				</div>
				<P>주문 내용을 확인하였으며, 위 내용에 동의합니다.</P>
			</RowDiv>
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

	//Memo 혜실: 렌더링 시 데이터 받기
	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	const getUserData = async () => {
		try {
			const res = await userApi.get(`/api/myInfo`);
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

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(`/api/reserve`, {
				total_price: payData.totalPrice,
				payment: selected,
				name: name,
				phoneNum: phoneNumber,
				email: email,
				personnel: payData.headCount,
				time_id: payData.timeId,
			});
		} catch (e) {
			console.log(e);
		}
	};

	//Memo 혜실: 렌더링 후 스크롤 맨위로
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [payData]);

	//Memo 혜실 : 결제 시 예약 가능 인원 데이터 받아서 확인 후 결제 요청
	const submitHandler = async () => {
		getReserveData();
	};

	const getReserveData = async () => {
		try {
			const res = await userApi.get(`/api/timetables/${payData.farmId}`);
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
	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPay(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			dispatch(showModal());
		}
	}, [resData]);

	// Memo 혜실 : 결제 수단 선택 handler
	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	return (
		<>
			<MomDiv>
				<ContextDiv>
					<Box>
						<ReservationInfo payData={payData}></ReservationInfo>
					</Box>
					<Box>
						<StyledSubTitle>예약자 정보</StyledSubTitle>
						<Bold>예약자</Bold>
						<TextDiv>
							{nameOpen ? (
								<Inp
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							) : (
								<P>{name}</P>
							)}
							{nameOpen ? (
								<YellowBtn onClick={() => setNameOpen(!nameOpen)}>
									완료
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setNameOpen(!nameOpen)}>
									수정
								</YellowBtn>
							)}
						</TextDiv>
						<Bold>연락처</Bold>
						<TextDiv>
							{phoneNumberOpen ? (
								<Inp
									type="text"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							) : (
								<P>{phoneNumber}</P>
							)}
							{phoneNumberOpen ? (
								<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									완료
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									수정
								</YellowBtn>
							)}
						</TextDiv>
						<Bold>이메일</Bold>
						<TextDiv>
							{emailOpen ? (
								<Inp
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							) : (
								<P>{email}</P>
							)}
							{emailOpen ? (
								<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
									완료
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
									수정
								</YellowBtn>
							)}
						</TextDiv>
						<RowDiv>
							<div>
								<RiErrorWarningLine size="20" />
							</div>
							<P>입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.</P>
						</RowDiv>
					</Box>
					<Box>
						<TextDiv>
							<StyledSubTitle>결제 수단</StyledSubTitle>
							<Form.Select
								onChange={handleSelect}
								value={selected}
								style={{ width: '200px' }}
							>
								<option value="card" key="card">
									카드결제
								</option>
								<option value="transfer" key="transfer">
									계좌이체
								</option>
							</Form.Select>
						</TextDiv>
						<PaymentInfo></PaymentInfo>
					</Box>
					<ButtonDiv>
						<ConfirmBtn onClick={submitHandler}>확인 및 결제</ConfirmBtn>
					</ButtonDiv>
				</ContextDiv>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
				{modalOpen && (
					<ModalContainer w="500px" h="280px">
						{pay ? (
							<ModalDiv>
								<ModalTittle>결제완료</ModalTittle>
								<ModalBtn
									onClick={() => {
										dispatch(closeModal());
										navigate(`/`);
									}}
								>
									확인
								</ModalBtn>
								<ModalBtn
									onClick={() => {
										dispatch(closeModal());
										navigate(`/mypage/reservation`);
									}}
								>
									구매내역보기
								</ModalBtn>
							</ModalDiv>
						) : (
							<ModalDiv>
								<ModalTittle>결제실패</ModalTittle>
								<P>체험 인원 초과로 예약이 실패되었습니다</P>
								<P>다른 시간대로 예약해주세요</P>
								<ModalBtnDiv>
									<ModalBtn
										type="button"
										onClick={() => {
											dispatch(closeModal());
											navigate(-1);
										}}
									>
										확인
									</ModalBtn>
								</ModalBtnDiv>
							</ModalDiv>
						)}
					</ModalContainer>
				)}
			</MomDiv>
		</>
	);
};

export default Payment;
